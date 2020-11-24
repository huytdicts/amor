import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from './model/user-create.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(_of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}
    @Query(_returns => User, {nullable: true}) 
    async getByUsername(@Args('username', { type: () => String }) username: string) {
        return this.userService.getByPartial({username: username}) || [];
    }

    @Mutation( _returns => User)
    async createUser(@Args('createUserDTO') dto: CreateUserDTO) {
        return this.userService.create(dto);
    }


}
