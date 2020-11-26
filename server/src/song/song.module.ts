import { Module } from '@nestjs/common';
import { SongService } from './song.service';
import { SongResolver } from './song.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Song]), UserService],
  providers: [SongService, SongResolver],
  exports: [SongService],
})
export class SongModule {}
