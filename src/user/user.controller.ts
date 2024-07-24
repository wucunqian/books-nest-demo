import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /**
   * 处理用户注册请求
   * 
   * @param registerUserDto - 接收 RegisterUserDto 作为参数，包含注册用户名和密码的数据传输对象
   * @returns 调用 UserService 的 register 方法
   */
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }
}
