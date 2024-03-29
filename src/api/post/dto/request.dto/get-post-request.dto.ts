import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsOptional, IsString } from 'class-validator';

import { PostModel } from '@src/api/post/entities/post.model';

export class GetPostRequestDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  page = 1;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  size = 10;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;

  toEntityForPagination() {
    return new PostModel({
      page: this.page,
      size: this.size,
      search: this.search,
    });
  }
}
