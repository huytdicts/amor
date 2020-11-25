/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';
import { IsUniqueInUser } from 'src/validate/unique-username.validator';

@InputType()
export class CreateUserDTO {
  @IsUniqueInUser()
  @Field(type => String)
  username: string;

  @Field(type => String)
  password: string;

  @IsUniqueInUser()
  @Field(type => String)
  email: string;
}
