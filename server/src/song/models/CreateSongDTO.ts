/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateSongDTO {
  @Field(_type => String)
  userId: string;

  @Field(_type => String)
  spotifyId: string;
}
