/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenDTO {
  @Field(_type => String)
  token: string;
}
