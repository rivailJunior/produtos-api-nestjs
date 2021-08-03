import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class isUserNameUniqueConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UserService) {}
  validate(
    userName: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const hasUserWithName = !!this.userService.findUserByName(userName);
    return !hasUserWithName;
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: isUserNameUniqueConstraint,
    });
  };
}
