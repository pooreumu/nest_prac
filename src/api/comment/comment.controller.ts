// 🐱 Nestjs imports
import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// 🌏 Project imports
import { ResponseEntity } from '@lib/response/response-entity';

import { User as IUser } from '@decorator/user/user';
import { User } from '@decorator/user/user.decorator';

import { LoggedInGuard } from '@auth/logged-in.guard';

import { CommentService } from './comment.service';
import { CreateCommentRequestDto } from './dto/request.dto/create-comment-request.dto';
import { UpdateCommentRequestDto } from './dto/request.dto/update-comment-request.dto';

@ApiTags('COMMENT')
@Controller('/posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @ApiOperation({ summary: '댓글 생성' })
  @Post()
  @UseGuards(LoggedInGuard)
  async createComment(
    @Param('postId') postId: number,
    @Body() commentData: CreateCommentRequestDto,
    @User() user: IUser,
  ): Promise<ResponseEntity<string>> {
    await this.commentsService.createComment(
      commentData.toCreateCommentDto(postId, user.id),
    );
    return ResponseEntity.OK();
  }

  @Put(':id')
  @UseGuards(LoggedInGuard)
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentRequestDto: UpdateCommentRequestDto,
    @User() user: IUser,
  ): Promise<ResponseEntity<string>> {
    await this.commentsService.updateComment(
      updateCommentRequestDto.toUpdateCommentDto(id, user.id),
    );
    return ResponseEntity.OK();
  }
}
