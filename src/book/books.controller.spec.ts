import { BooksServices } from './books.service';
import { BooksController } from './books.controller';
import { Test, TestingModule } from '@nestjs/testing';
describe('Books', () => {
  let appController: BooksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksServices],
    }).compile();

    appController = app.get<BooksController>(BooksController);
  });
  describe('BooksController', () => {
    it('should get all books', async () => {
      const mockBookData = {
        id: 2,
        codigo: 'LIV001',
        nome: 'Livro de javascript para iniciantes',
        preco: '29.90',
        createdAt: '2021-07-16T21:42:29.000Z',
        updatedAt: '2021-07-16T21:45:55.000Z',
      };
      expect(appController.obeterUm(1)).toBe(mockBookData);
    });
  });
});
