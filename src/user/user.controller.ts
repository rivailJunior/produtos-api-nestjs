import { NestResponseBuilder } from './../core/http/nest-response.builder';
import { User } from './user.entity';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { NestResponse } from '../core/http/nest-response';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':name')
  public findUserByName(@Param('name') name: string): User {
    const foundUser = this.userService.findUserByName(name);
    if (!foundUser)
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
      });
    return foundUser;
  }

  @Post()
  public create(@Body() user: User): NestResponse {
    const created = this.userService.create(user);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `/users/${created.name}` })
      .withBody(created)
      .build();
  }
}
