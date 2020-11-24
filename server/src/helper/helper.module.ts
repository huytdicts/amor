import { Module } from '@nestjs/common';
import { encryptHelper } from './encrypt.helper';

@Module({
  providers: [
    {
        provide: 'ENCRYPT_HELPER',
        useValue: encryptHelper 
    }
  ],
})
export class HelperModule {}
