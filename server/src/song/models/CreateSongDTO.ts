/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSongDTO {
  @Field(_type => String, { nullable: true })
  userId: string;

  @Field(_type => [SongDTO])
  song: SongDTO[];
}

@InputType()
export class SongDTO {
  @Field(_type => String)
  spotifyId: string;
}
