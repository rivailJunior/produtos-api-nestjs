import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users: Array<User> = [
    {
      id: 1,
      name: 'rivail',
      email: 'rivail.rj@gmail.com',
      password: '123',
      fullname: 'rivail dos santos pinto junior',
      registeredAt: new Date(),
    },
  ];

  findUserByName(name: string): User {
    return this.users.find((user) => user.name === name);
  }

  public create(user: User): User {
    this.users.push(user);

    return user;
  }
}
