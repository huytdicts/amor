import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async verifyPassword(username: string, password: string): Promise<User> {
    const foundUser = await this.userService.getByPartial({ username });
    const legit = await foundUser.comparePassword(password);
    if (legit) {
      return foundUser;
    }
  }
}
