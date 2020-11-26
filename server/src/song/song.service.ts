import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateSongDTO, SongDTO } from './models/CreateSongDTO';
import { GetSongDTO } from './models/GetSongDTO';
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
    const foundUser = await this.userService.getById(songCreate.userId, [
      'song',
    ]);
    const retSong: Array<Song> = [];
    await Promise.all(
      songCreate.song.map(async song => {
        const resSong = await this.songRepository.save(song);
        foundUser.song.push(resSong);
        retSong.push(resSong);
      }),
    );
    await this.userService.update(foundUser.userId, foundUser);
    return retSong;
  }
  async getSongByUserId(userId: string) {
    return (await this.userService.getById(userId, ['song'])).song;
  }
}
