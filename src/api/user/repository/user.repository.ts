import { User } from '@user/entities/user.entity';

export interface UserRepository {
  save: (user: User) => Promise<User | undefined>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
