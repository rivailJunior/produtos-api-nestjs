import { HttpAdapterHost } from '@nestjs/core';
import { ExceptionHttpFilter } from './exception-http-filter';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';

const mockGetResponse = jest.fn().mockImplementation(() => ({
  json: jest.fn().mockReturnThis(),
  status: jest.fn().mockReturnThis(),
}));

const mockGetRequest = jest.fn().mockImplementation(() => ({
  path: 'some-path',
}));

const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: mockGetRequest,
}));

const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};
const mockHttpAdapter = {
  reply: jest.fn(),
};
const mockHttpAdapterHost = jest.fn().mockImplementation(() => ({
  httpAdapter: mockHttpAdapter,
}));
describe('System header validation service', () => {
  let service: ExceptionHttpFilter;
  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExceptionHttpFilter,
        {
          provide: HttpAdapterHost,
          useFactory: mockHttpAdapterHost,
        },
      ],
    }).compile();
    service = module.get<ExceptionHttpFilter>(ExceptionHttpFilter);
  });
  describe('All exception filter tests', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    it.each([
      [HttpStatus.BAD_REQUEST],
      [HttpStatus.BAD_GATEWAY],
      [HttpStatus.UNAUTHORIZED],
      [HttpStatus.FORBIDDEN],
      [HttpStatus.NOT_FOUND],
    ])(
      'should return with correct statusCode error when statusCode is: %s',
      (statusCode) => {
        const testException = new HttpException('Http exception', statusCode);
        testException.getStatus = jest.fn();

        service.catch(testException, mockArgumentsHost);
        expect(mockHttpArgumentsHost).toBeCalledTimes(1);
        expect(mockHttpArgumentsHost).toBeCalledWith();
        expect(mockGetResponse).toBeCalledTimes(1);
        expect(mockGetResponse).toBeCalledWith();
        expect(mockGetResponse).toBeCalledWith();
        expect(testException.getStatus).toBeCalledTimes(1);
      },
    );
  });
});
