import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
// book 的数据库信息字段和类型
import { Book } from './entities/book.entity';

/**
 * 随机生成 ID 作为 book 的 id;
 */
function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {

  @Inject() dbService: DbService;

  /**
   * 创建一个新的图书
   * @param createBookDto - 包含新图书信息的数据传输对象
   * @returns - 创建成功返回的图书对象
   */
  async create(createBookDto: CreateBookDto) {
    // 先查询当前的数据库
    const books: Book[] = await this.dbService.read();

    // 创建一个新的 Book 实例并填入数据
    const book = new Book();
    book.id = randomNum();
    book.author = createBookDto.author;
    book.name = createBookDto.name;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;

    // 将新 Book 实例添加到 books 数组中
    books.push(book);

    // 将新的数据写入到数据库中
    await this.dbService.write(books);

    // 返回创建好的 Book 实例
    return book;
  }

  /**
   * 查询全部图书
   * @returns - 返回数据库所有信息
   */
  async list() {
    const books: Book[] = await this.dbService.read();
    return books;
  }

  /**
   * 查询单个图书
   * @param id - 要查询的图书 ID
   * @returns - 返回查询到的 Book 实例，如果找不到，则返回 Bad Request 400 状态和找不到信息
   */
  async findById(id: number) {
    const books: Book[] = await this.dbService.read();
    return books.find(book => book.id === id);
  }

  /**
   * 更新单个图书
   * @param updateBookDto - 包含更新的数据传输对象
   * @returns - 返回更新后的 Book 实例，如果找不到，则返回 Bad Request 400 状态和找不到信息
   */
  async update(updateBookDto: UpdateBookDto) {
    // 查询当前的数据库中所有图书
    const books: Book[] = await this.dbService.read();

    // 查询该 ID 的图书是否存在
    const foundBook = books.find(book => book.id === updateBookDto.id);

    // 如果找不到该 ID 的图书，返回 Bad Request 400 状态和找不到信息
    if (!foundBook) {
      throw new BadRequestException('该图书不存在');
    }

    // 如果找到该 ID 的图书，则更新其信息（除了id）
    foundBook.author = updateBookDto.author;
    foundBook.cover = updateBookDto.cover;
    foundBook.description = updateBookDto.description;
    foundBook.name = updateBookDto.name;

    // 将更新的数据写入到数据库中
    await this.dbService.write(books);

    // 返回更新后的 Book 实例
    return foundBook;
  }

  /**
   * 删除单个图书
   * @param id - 要删除的图书 ID
   * @returns - 返回一个自定义对象
   */
  async delete(id: number) {
    // 查询当前的数据库中所有图书
    const books: Book[] = await this.dbService.read();

    // 查询该 ID 的图书是否存在
    const index = books.findIndex(book => book.id === id);

    // 存在则直接将其删除
    if (index !== -1) {
      books.splice(index, 1);
    }

    // 将更新的数据写入到数据库中
    await this.dbService.write(books);

    // 返回一个自定义的成功删除的消息
    return { msg: '成功删除' };
  }
}
