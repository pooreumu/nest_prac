import { Comment } from '../entities/comment.entity';

export class UpdateCommentDto {
  private readonly _content: string;
  private readonly _userId: number;
  private readonly _id: number;

  constructor(commentData: { content: string; userId: number; id: number }) {
    this._content = commentData.content;
    this._userId = commentData.userId;
    this._id = commentData.id;
  }

  get content(): string {
    return this._content;
  }

  get userId(): number {
    return this._userId;
  }

  get id(): number {
    return this._id;
  }

  toEntity() {
    return Comment.updateComment(this.id, this.content, this.userId);
  }
}
