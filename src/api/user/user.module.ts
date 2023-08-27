// 🐱 Nestjs imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// 🌏 Project imports
import { UserController } from './controller/user.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
