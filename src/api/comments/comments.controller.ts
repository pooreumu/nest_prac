// π± Nestjs imports
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

// π Project imports
import { ResponseEntity } from '@lib/response/ResponseEntity';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('COMMENT')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'λκΈ μμ±' })
  @Post()
  async createComment(
    @Body() commentData: CreateCommentDto,
  ): Promise<ResponseEntity<string>> {
    await this.commentsService.createComment(commentData);
    return ResponseEntity.OK();
  }

  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() commentData: UpdateCommentDto,
  ): Promise<ResponseEntity<string>> {
    await this.commentsService.updateComment(id, commentData);
    return ResponseEntity.OK();
  }
}
