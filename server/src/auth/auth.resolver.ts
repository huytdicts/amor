/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TokenHelper } from 'src/helper/token.helper';
import { AuthService } from './auth.service';
import { LoginDTO } from './model/login.dto';
import { TokenDTO } from './model/token.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenHelper: TokenHelper,
  ) {}
  @Mutation(_of => TokenDTO)
  async login(@Args('loginDTO') loginDTO: LoginDTO) {
    const { username, password } = loginDTO;
    const user = await this.authService.verifyPassword(username, password);
    if (user) {
      return this.tokenHelper.generate(Object.assign({}, user));
    }
  }
}
