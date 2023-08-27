import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateUserDto } from '@src/api/user/dto/create-user.dto';
import { UsersService } from '@src/api/user/users.service';
import { User } from '@src/lib/decorator/user.decorator';

import { ResponseEntity } from '@lib/response/response-entity';

import { LocalAuthGuard } from '@auth/local-auth.guard';

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
  async signIn(@User() user: { id: number; nickname: string }) {
    return user;
  }
}
