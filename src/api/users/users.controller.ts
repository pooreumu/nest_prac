import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { User } from '@src/common/decorator/user.decorator';

import { ResponseEntity } from '@lib/response/response-entity';

import { LocalAuthGuard } from '@auth/local-auth.guard';

import { CreateUserDto } from '@users/dto/create-user.dto';
import { UsersService } from '@users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseEntity<string>> {
    await this.usersService.signUp(createUserDto);
    return ResponseEntity.OK();
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@User() user) {
    return user;
  }
}
