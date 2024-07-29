import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
// 使用此类型，可以调用其中的类型校验
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

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
}
