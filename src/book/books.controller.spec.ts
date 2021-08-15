import { Livro } from './book.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { BooksServices } from './books.service';
import { BooksController } from './books.controller';
import { Test, TestingModule } from '@nestjs/testing';
describe('Books', () => {
  let appController: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksServices],
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
        SequelizeModule.forFeature([Livro]),
      ],
    }).compile();

    appController = app.get<BooksController>(BooksController);
  });
  describe('BooksController', () => {
    it('should get all books', async () => {
      const result = await appController.obterTodos();
      expect(result).toMatchObject([
        {
          id: 1,
          codigo: 'LIV001',
          nome: 'Livro de javascript',
          preco: '29.90',
          createdAt: new Date('2021-07-16T21:41:39.000Z'),
          updatedAt: new Date('2021-07-16T21:41:39.000Z'),
        },
        {
          id: 2,
          codigo: 'LIV001',
          nome: 'Livro de javascript para iniciantes',
          preco: '29.90',
          createdAt: new Date('2021-07-16T21:42:29.000Z'),
          updatedAt: new Date('2021-07-16T21:45:55.000Z'),
        },
        {
          id: 3,
          codigo: 'LIV003',
          nome: 'Livro de sintaxe',
          preco: '29.90',
          createdAt: new Date('2021-07-16T21:42:42.000Z'),
          updatedAt: new Date('2021-07-16T21:42:42.000Z'),
        },
        {
          id: 6,
          codigo: 'LIV003',
          nome: 'Livro de sintaxe',
          preco: '29.90',
          createdAt: new Date('2021-07-16T22:12:06.000Z'),
          updatedAt: new Date('2021-07-16T22:12:06.000Z'),
        },
        {
          id: 7,
          codigo: 'LIV003',
          nome: 'Livro de sintaxe',
          preco: '29.90',
          createdAt: new Date('2021-07-20T21:26:04.000Z'),
          updatedAt: new Date('2021-07-20T21:26:04.000Z'),
        },
      ]);
    });
  });
});
