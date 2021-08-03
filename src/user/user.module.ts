import { isUserNameUniqueConstraint } from './isUserUniqueValidator';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [UserService, isUserNameUniqueConstraint],
})
export class UserModule {}
