import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { BaseEntity } from 'typeorm';
import { BaseService } from './base.service';

export abstract class BaseUniqueValidator<T extends BaseEntity>
  implements ValidatorConstraintInterface {
  constructor(private readonly baseService: BaseService<T>) {}
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const queryObject = {};
    queryObject[validationArguments.property] = value;
    const foundExistedUsername = await this.baseService.getByPartial(
      queryObject,
    );
    return !foundExistedUsername;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Error: ${validationArguments.value} of property ${validationArguments.property} is existed !`;
  }
}

export function IsUnique(
  // eslint-disable-next-line @typescript-eslint/ban-types
  validator: Function | ValidatorConstraintInterface,
  validationOptions?: ValidationOptions,
) {
  return function(object: unknown, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator,
    });
  };
}
