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
  @Mutation(of => TokenDTO)
  async login(@Args('loginDTO') loginDTO: LoginDTO) {
    const { username, password } = loginDTO;
    const user = await this.authService.verifyPassword(username, password);
    if (user) {
      return this.tokenHelper.generate(Object.assign({}, user)); //* Jwt generate method only accept plain object
    }
  }
}
