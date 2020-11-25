import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ name: 'isUsernameUnique', async: true })
@Injectable()
export class UniqueUsernameValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const foundExistedUsername = await this.userService.getByPartial({
      username: value,
    });
    return !foundExistedUsername;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.value} is existed !`;
  }
}

export function IsUsernameUnique(validationOption?: ValidationOptions) {
  return function(object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOption,
      constraints: [],
      validator: UniqueUsernameValidator,
    });
  };
}
