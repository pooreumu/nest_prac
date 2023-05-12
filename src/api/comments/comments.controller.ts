// 🐱 Nestjs imports
import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// 🌏 Project imports
import { ResponseEntity } from '@lib/response/response-entity';

import { User } from '@decorator/user.decorator';

import { LoggedInGuard } from '@auth/logged-in.guard';

import { CommentsService } from './comments.service';
import { CreateCommentRequestDto } from './dto/request.dto/create-comment-request.dto';
import { UpdateCommentRequestDto } from './dto/request.dto/update-comment-request.dto';

@ApiTags('COMMENT')
@Controller('/posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 생성' })
  @Post()
  @UseGuards(LoggedInGuard)
  async createComment(
    @Param('postId') postId: number,
    @Body() commentData: CreateCommentRequestDto,
    @User() user,
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
    @User() user,
  ): Promise<ResponseEntity<string>> {
    await this.commentsService.updateComment(
      updateCommentRequestDto.toUpdateCommentDto(id, user.id),
    );
    return ResponseEntity.OK();
  }
}
