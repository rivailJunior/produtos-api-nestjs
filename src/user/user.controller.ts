import { NestResponseBuilder } from './../core/http/nest-response.builder';
import { User } from './user.entity';
import { Controller, Post, Body, Get, Param, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { NestResponse } from 'src/core/http/nest-response';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':name')
  public findUserByName(@Param('name') name: string): User {
    const foundUser = this.userService.findUserByName(name);
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
