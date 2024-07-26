import { Inject, Injectable } from '@nestjs/common';
import { DbModuleOptions } from './db.module';
import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  // 动态模块注入
  @Inject('OPTIONS') private options: DbModuleOptions;

  // 查询数据库
  async read() {
    // 通过动态模块注入获取到了user.module.ts传递的数据库创建路径
    const filePath = this.options.path;

    // 通过 access(filePath) 函数检查文件是否可以访问。这里的 access 函数可能是一个异步操作，它返回一个 Promise。
    try {
      await access(filePath);
    } catch (e) {
      // 使用 try...catch 块来捕获 access 操作可能抛出的错误。如果访问失败（比如文件不存在或者没有权限访问），则捕获异常并返回一个空数组 []。
      return [];
    }

    // 没有异常，则读取 JSON 文件中的数据并返回
    const str = await readFile(filePath, {
      encoding: 'utf-8'
    });

    // 如果 JSON 文件为空，返回空数组
    if (!str) {
      return [];
    }
    // 否则返回 JSON.parse 解析后的 JSON 数组
    return JSON.parse(str);
  }

  // 写入数据库
  async write(obj: Record<string, any>) {
    // 写入方法异步，参数一为写入路径，参数二为写入的数据，如果不为空就是一个数组包对象，参数三为格式编码
    await writeFile(this.options.path, JSON.stringify(obj || []), {
      encoding: 'utf-8'
    });
  }
}
