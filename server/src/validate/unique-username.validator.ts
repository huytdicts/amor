import { Injectable } from '@nestjs/common';
import { ValidationOptions, ValidatorConstraint } from 'class-validator';
import { BaseUniqueValidator, IsUnique } from 'src/base/base.unique-validator';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@ValidatorConstraint({ name: 'isUsernameUnique', async: true })
@Injectable()
export class UniqueInUserValidator extends BaseUniqueValidator<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }
}

export function IsUniqueInUser(validationOption?: ValidationOptions) {
  return IsUnique(UniqueInUserValidator, validationOption);
}
