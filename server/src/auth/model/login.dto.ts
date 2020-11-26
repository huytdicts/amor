/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginDTO {
  @Field(_type => String)
  username: string;

  @Field(_type => String)
  password: string;
}
