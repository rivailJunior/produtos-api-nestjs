import { ProdutoServices } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ProdutosController],
  providers: [AppService, ProdutoServices],
})
export class AppModule {}
