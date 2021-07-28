import { User } from './user.entity';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':name')
  public findUserByName(@Param('name') name: string): User {
    const foundUser = this.userService.findUserByName(name);
    return foundUser;
  }

  @Post()
  public create(@Body() user: User): User {
    const created = this.userService.create(user);

    return created;
  }
}
