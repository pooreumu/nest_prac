import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@src/api/user/entities/user.entity';

import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './service/auth.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}
