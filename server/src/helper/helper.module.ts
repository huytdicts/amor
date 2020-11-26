import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { encryptHelper } from './encrypt.helper';
import { TokenHelper } from './token.helper';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'ENCRYPT_HELPER',
      useValue: encryptHelper,
    },
    TokenHelper,
  ],
  exports: [TokenHelper],
})
export class HelperModule {}
