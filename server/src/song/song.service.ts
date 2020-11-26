import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateSongDTO } from './models/CreateSongDTO';
import { Song } from './song.entity';

@Injectable()
export class SongService extends BaseService<Song> {
  constructor(
    @InjectRepository(Song) private readonly songRepository: Repository<Song>,
    private readonly userService: UserService,
  ) {
    super(songRepository);
  }

  async createSong(songCreate: CreateSongDTO) {
    const newSong = new Song({ ...songCreate });
    const retSong = this.songRepository.save(newSong);
    const foundUser = await this.userService.getById(songCreate.userId, [
      'songs',
    ]);
    foundUser.song.push(newSong);
    await this.userService.update(foundUser.userId, foundUser);
    return retSong;
  }
}
