import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { USER_REPOSITORY } from '@user/repository/user.repository';

import { UserController } from './controller/user.controller';
import { User } from './entities/user.entity';
import { UserTypeormRepository } from './repository/user.typeorm-repository';
import { UserService } from './service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserTypeormRepository,
    },
  ],
})
export class UserModule {}
