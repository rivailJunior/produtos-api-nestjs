import { Produto } from './produto.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('produtos')
export class ProdutosController {
  produtos: Produto[] = [
    new Produto('LIV01', 'Livro TDD e BDD na pratica', 29.9),
    new Produto('LIV02', 'Livro Iniciando Flutter', 29.9),
    new Produto('LIV03', 'Inteligencia artificial com servico', 29.9),
  ];

  @Get()
  obterTodos(): Produto[] {
    return this.produtos;
  }

  @Get(':id')
  obeterUm(@Param() params): Produto {
    return this.produtos[0];
  }

  @Post()
  criar(@Body() produto: Produto) {
    produto.id = Date.now();
    return this.produtos.push(produto);
  }

  @Put()
  alterar(@Body() produto: Produto): Produto {
    return produto;
  }

  @Delete(':id')
  apagar(@Param() params) {
    return this.produtos.pop();
  }
}
