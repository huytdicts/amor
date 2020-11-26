import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './model/user-create.dto';
import { User } from './user.entity';
@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  create(payload: CreateUserDTO) {
    const newUser = new User({ ...payload });
    newUser.hashPassword();
    return this.userRepository.save(newUser);
  }
}
