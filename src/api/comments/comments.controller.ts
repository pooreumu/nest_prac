// 🐱 Nestjs imports
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// 🌏 Project imports
import { CommentsService } from './comments.service';
import { ResponseEntity } from '../../lib/response/ResponseEntity';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('COMMENT')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '댓글 생성' })
  @Post()
  async createComment(
    @Body() commentData: CreateCommentDto,
  ): Promise<ResponseEntity<string>> {
    await this.commentsService.createComment(commentData);
    return ResponseEntity.OK();
  }
}
