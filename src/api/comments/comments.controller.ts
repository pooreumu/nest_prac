// 🐱 Nestjs imports
import { Body, Controller, Post } from '@nestjs/common';

// 🌏 Project imports
import { CommentsService } from './comments.service';
import { ResponseEntity } from '../../lib/response/ResponseEntity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('COMMENT')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(
    @Body() commentData: CreateCommentDto,
  ): Promise<ResponseEntity<string>> {
    await this.commentsService.createComment(commentData);
    return ResponseEntity.OK();
  }
}
