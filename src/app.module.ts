import { UserModule } from './user/user.module';
import { BooksModule } from './book/books.module';
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'livraria',
      autoLoadModels: true,
      synchronize: true,
    }),
    BooksModule,
    UserModule,
  ],

  // controllers: [AppController, BooksController],
  // providers: [AppService, BooksServices],
})
export class AppModule {}
