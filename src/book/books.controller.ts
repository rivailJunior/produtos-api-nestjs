import { BooksServices } from './books.service';
import { Livro } from './book.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('livros')
export class BooksController {
  constructor(private booksServices: BooksServices) {}
  @Get()
  async obterTodos(): Promise<Livro[]> {
    return this.booksServices.getAll();
  }

  @Get(':id')
  async obeterUm(@Param() params): Promise<Livro> {
    return this.booksServices.getById(params.id);
  }

  @Post()
  async criar(@Body() livro: Livro) {
    return this.booksServices.create(livro);
  }

  @Put()
  async alterar(@Body() livro: Livro): Promise<[number, Livro[]]> {
    return this.booksServices.update(livro);
  }

  @Delete(':id')
  async apagar(@Param() params) {
    return this.booksServices.deleteById(params.id);
  }
}
