import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokenHelper } from 'src/helper/token.helper';
import { AppContext } from 'src/types/app-context.context';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly tokenHelper: TokenHelper,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext<
      any | AppContext
    >();
    if (!ctx.headers.authorization) return false;
    const jwtPayload = await this.validateToken(ctx.headers.authorization);

    //* Bind user in request context
    ctx.user = await this.userService.getByPartial({
      username: (jwtPayload as any).username,
    });

    return true;
  }
  async validateToken(auth: string): Promise<User> {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new ForbiddenException('Invalid Token!');
    }
    const jwtToken = auth.split(' ')[1];
    try {
      const payload = await this.tokenHelper.verify<User>(jwtToken);
      return payload;
    } catch (err) {
      throw new BadRequestException('Invalid Token!');
    }
  }
}
