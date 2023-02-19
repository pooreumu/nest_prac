import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseEntity } from '../../lib/response/ResponseEntity';

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
}
