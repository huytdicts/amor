import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateSongDTO } from './models/CreateSongDTO';
import { Song } from './song.entity';
import { SongService } from './song.service';

@Resolver(_of => Song)
export class SongResolver {
  constructor(private readonly songService: SongService) {}
  @Mutation(type => Song)
  async createSong(
    @Args('CreateSongDTO') createSongDTO: CreateSongDTO,
  ): Promise<Song> {
    return await this.songService.createSong(createSongDTO);
  }
}
