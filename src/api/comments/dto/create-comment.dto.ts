// 🐱 Nestjs imports
// 📦 Package imports

// 🌏 Project imports
import { Comment } from '../entities/comment.entity';

export class CreateCommentDto {
  private readonly _content: string;
  private readonly _userId: number;
  private readonly _postId: number;

  constructor(commentData: {
    content: string;
    userId: number;
    postId: number;
  }) {
    this._content = commentData.content;
    this._userId = commentData.userId;
    this._postId = commentData.postId;
  }

  get content(): string {
    return this._content;
  }

  get userId(): number {
    return this._userId;
  }

  get postId(): number {
    return this._postId;
  }

  toEntity() {
    return Comment.createComment({
      postId: this.postId,
      userId: this.userId,
      content: this.content,
    });
  }
}
