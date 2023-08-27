// 🐱 Nestjs imports
import { Injectable } from '@nestjs/common';

// 🌏 Project imports
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    await this.usersRepository.insert(await createUserDto.toEntity());
  }
}
