import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  /**
   * 通过创建一个新的user实体并将其持久化到数据库来注册一个新用户
   *
   * @param registerUserDto - 包含新用户的用户名和密码的数据传输对象
   * @returns 新创建的User实体
   * @throws BadRequestException - 如果数据库中已经存在具有相同用户名的用户
   */
  @Inject(DbService)
  dbService: DbService;
  async register(registerUserDto: RegisterUserDto) {
    // 查询当前数据库中所有用户名的用户
    const users: User[] = await this.dbService.read();

    // 搜索数据库是否存在，如果存在，则返回 Bad Request 400 状态和已存在的 username 信息
    const foundUser = users.find(item => item.username === registerUserDto.username);

    // 并判断返回提示信息
    if (foundUser) {
      throw new BadRequestException('该用户已经注册');
    }

    // 如果没有找到，则创建一个新的 User
    const user = new User();

    // 将 controller 传递的数据赋值给新对象
    user.username = registerUserDto.username;
    user.password = registerUserDto.password;

    // 将新 User 对象添加到 users 数组中
    users.push(user);

    // 将新用户的数据持久化到数据库中
    await this.dbService.write(users);

    // 返回传递的数据
    return user;
  }
}
