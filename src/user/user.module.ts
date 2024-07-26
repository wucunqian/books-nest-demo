import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    // 使用 DbModule 并指定 users.json 文件路径为持久化存储的位置
    DbModule.register({
      path: "src/db/users.json"
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
