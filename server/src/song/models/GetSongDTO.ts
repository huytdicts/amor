/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetSongDTO {
  @Field(type => String, { nullable: true })
  userId: string;
}
