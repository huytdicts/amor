import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UniqueInUserValidator } from './unique-username.validator';

@Module({
  imports: [UserModule],
  providers: [UniqueInUserValidator],
})
export class ValidateModule {}
