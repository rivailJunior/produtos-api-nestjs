import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Livro } from './book.model';

@Injectable()
export class BooksServices {
  constructor(@InjectModel(Livro) private bookModel: typeof Livro) {}

  async getAll(): Promise<Livro[]> {
    return this.bookModel.findAll();
  }

  async getById(id: number): Promise<Livro> {
    return this.bookModel.findByPk(id);
  }

  async create(book: Livro) {
    return this.bookModel.create(book);
  }

  async update(book: Livro): Promise<[number, Livro[]]> {
    return this.bookModel.update(book, {
      where: {
        id: book.id,
      },
    });
  }

  async deleteById(id: number) {
    const book: Livro = await this.getById(id);
    book.destroy();
  }
}
