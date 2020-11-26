import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { HelperModule } from 'src/helper/helper.module';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [UserModule, HelperModule, HelperModule],
  providers: [AuthService, AuthResolver, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
