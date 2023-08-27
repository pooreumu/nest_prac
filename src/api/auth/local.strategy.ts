import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { AuthService } from './service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'nickname', passwordField: 'password' });
  }

  async validate(nickname: string, password: string, done: CallableFunction) {
    const user = await this.authService.validateUser(nickname, password);
    if (!user) throw new UnauthorizedException();

    return done(null, user);
  }
}
