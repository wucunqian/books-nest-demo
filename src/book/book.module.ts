import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    // 使用 DbModule 并指定 users.json 文件路径为持久化存储的位置
    DbModule.register({
      path: "src/db/books.json"
    })
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule { }
