import { LivroServices } from './livros.service';
import { Livro } from './livro.model';
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
export class LivrosController {
  constructor(private livrosService: LivroServices) {}
  @Get()
  obterTodos(): Livro[] {
    return this.livrosService.obterTodos();
  }

  @Get(':id')
  obeterUm(@Param() params): Livro {
    return this.livrosService.obterUm(params.id);
  }

  @Post()
  criar(@Body() livro: Livro) {
    livro.id = Date.now();
    return this.livrosService.criar(livro);
  }

  @Put()
  alterar(@Body() livro: Livro): Livro {
    return this.livrosService.alterar(livro);
  }

  @Delete(':id')
  apagar(@Param() params) {
    return this.livrosService.apagar(params.id);
  }
}
