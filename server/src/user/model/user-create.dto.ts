/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { IsUsernameUnique } from 'src/validate/unique-username.validator';

@InputType()
export class CreateUserDTO {
  @IsUsernameUnique()
  @Field(type => String)
  username: string;

  @Field(type => String)
  password: string;

  @Field(type => String)
  email: string;
}
