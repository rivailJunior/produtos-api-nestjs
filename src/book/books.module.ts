import { SequelizeModule } from '@nestjs/sequelize';
import { BooksServices } from './books.service';
import { BooksController } from './books.controller';
import { Module } from '@nestjs/common';
import { Livro } from './book.model';

@Module({
  imports: [SequelizeModule.forFeature([Livro])],
  providers: [BooksServices],
  controllers: [BooksController],
})
export class BooksModule {}
