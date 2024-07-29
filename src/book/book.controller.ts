import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookService } from './book.service';
// 使用此类型，可以调用其中的类型校验
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import * as path from 'path';
import { storage } from './fileImg';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  /**
   * 创建新的图书
   * @param createBookDto - 接收 CreateBookDto 作为参数，包含新图书的名称、作者、描述、封面等的数据传输对象
   * @returns - 调用 bookService 的 create 方法
   */
  @Post('create')
  async create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  /**
   * 查询全部图书
   * @returns - 调用 bookService 的 list 方法
   */
  @Get('list')
  async list() {
    return this.bookService.list();
  }

  /**
   * 查询单个图书
   * @param id - 接收 id 作为参数，查询特定图书的 id
   * @returns - 调用 bookService 的 findById 方法
   */
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.bookService.findById(+id);
  }

  /**
   * 修改图书信息
   * @param updateBookDto - 接收 UpdateBookDto 作为参数，包含新图书的名称、作者、描述、封面等的数据传输对象
   * @returns - 调用 bookService 的 update 方法
   */
  @Put('update')
  async update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  /**
   * 删除单个图书
   * @param id - 接收 id 作为参数，删除特定图书的 id
   * @returns - 调用 bookService 的 delete 方法
   */
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }

  /**
   * 上传图片并返回图片路径。
   * 该函数使用 Multer 库来处理上传的图片，并将其存储在 'uploads' 目录中。
   * 该函数使用 FileInterceptor 拦截器来处理上传的图片，并对图片的类型和大小进行检查。
   * @param {Express.Multer.File} file - 上传的图片文件。
   * @returns {string} - 上传成功后返回图片的路径。
   *
   * @throws {BadRequestException} - 如果上传的图片类型不在 ['.png', '.jpg', '.gif'] 之中，或者图片大小超过 3MB，则会抛出 400 状态的 Bad Request 异常。
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads',
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 3
    },
    fileFilter(req, file, callback) {
      const extname = path.extname(file.originalname);
      if (['.png', '.jpg', '.gif', '.webp'].includes(extname)) {
        callback(null, true);
      } else {
        callback(new BadRequestException('只能上传图片'), false);
      }
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return file.path;
  }
}
