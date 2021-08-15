import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './book/books.module';
import { ExceptionHttpFilter } from './common/filters/exception-http-filter';
import { UserModule } from './user/user.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: APP_FILTER,
          useClass: ExceptionHttpFilter,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: ClassSerializerInterceptor,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
