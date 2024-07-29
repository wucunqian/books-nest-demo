import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { DbModule } from 'db/db.module';

@Module({
  imports: [
    // 使用 DbModule 并指定 books.json 文件路径为持久化存储的位置（动态写入这个位图书存储）
    DbModule.register({
      path: "db/books.json"
    })
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule { }
