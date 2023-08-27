import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateUserDto } from '@src/api/user/dto/create-user.dto';

import { ResponseEntity } from '@lib/response/response-entity';

import { User } from '@decorator/user/user.decorator';

import { LocalAuthGuard } from '@auth/local-auth.guard';

import { UserService } from '@user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseEntity<string>> {
    await this.usersService.signUp(createUserDto);
    return ResponseEntity.OK();
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@User() user: { id: number; nickname: string }) {
    return user;
  }
}
