import { ProdutoServices } from './produtos.service';
import { Produto } from './produtos.model';
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
  constructor(private produtosService: ProdutoServices) {}
  @Get()
  obterTodos(): Produto[] {
    return this.produtosService.obterTodos();
  }

  @Get(':id')
  obeterUm(@Param() params): Produto {
    return this.produtosService.obterUm(params.id);
  }

  @Post()
  criar(@Body() produto: Produto) {
    produto.id = Date.now();
    return this.produtosService.criar(produto);
  }

  @Put()
  alterar(@Body() produto: Produto): Produto {
    return this.produtosService.alterar(produto);
  }

  @Delete(':id')
  apagar(@Param() params) {
    return this.produtosService.apagar(params.id);
  }
}
