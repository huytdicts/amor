import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.entity';
import { CreateSongDTO } from './models/CreateSongDTO';
import { Song } from './song.entity';
import { SongService } from './song.service';

@Resolver(_of => Song)
export class SongResolver {
  constructor(private readonly songService: SongService) {}
  @UseGuards(AuthGuard)
  @Mutation(type => [Song])
  async createSong(
    @Args('CreateSongDTO') createSongDTO: CreateSongDTO,
    @Context() { user }: { user: User },
  ): Promise<Song[]> {
    if (!createSongDTO.userId) createSongDTO.userId = user.userId;
    return await this.songService.createSong(createSongDTO);
  }

  @UseGuards(AuthGuard)
  @Query(type => [Song], { nullable: true })
  async getSongsByUserID(@Context() { user }: { user: User }): Promise<Song[]> {
    return this.songService.getSongByUserId(user.userId);
  }
}
