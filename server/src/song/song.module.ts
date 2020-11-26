import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { HelperModule } from 'src/helper/helper.module';
import { UserModule } from 'src/user/user.module';
import { Song } from './song.entity';
import { SongResolver } from './song.resolver';
import { SongService } from './song.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song]),
    UserModule,
    AuthModule,
    HelperModule,
  ],
  providers: [SongService, SongResolver],
  exports: [SongService],
})
export class SongModule {}
