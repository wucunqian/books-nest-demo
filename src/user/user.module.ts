import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    // 调用数据库方法，将数据库创建到此目录下
    DbModule.register({
      path: "src/db/users.json"
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
