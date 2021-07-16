import { Injectable } from '@nestjs/common';
import { Livro } from './livro.model';

@Injectable()
export class LivroServices {
  private readonly livros: Livro[] = [
    // new Livro('LIV01', 'Livro TDD e BDD na prática', 29.9),
    // new Livro('LIV02', 'Livro Iniciando com Flutter', 39.9),
    // new Livro('LIV03', 'Inteligência artificial como serviço', 29.9),
  ];

  obterTodos(): Livro[] {
    return this.livros;
  }

  obterUm(id: number): Livro {
    return this.livros[0];
  }

  criar(livro: Livro) {
    this.livros.push(livro);
  }

  alterar(livro: Livro): Livro {
    return livro;
  }

  apagar(id: number) {
    this.livros.pop();
  }
}
