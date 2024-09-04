import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  // 开启后端跨域
  app.enableCors()

  // 设置静态路径
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' })

  await app.listen(3000)
};
bootstrap()
