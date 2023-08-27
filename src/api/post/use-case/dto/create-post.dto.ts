import { Comment } from '@comment/entities/comment.entity';

export class CreatePostDto {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _content: string;
  private readonly _userId: number;
  private readonly _comments: Comment[];
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  constructor(param: {
    id: number;
    title: string;
    content: string;
    userId: number;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this._id = param.id;
    this._title = param.title;
    this._content = param.content;
    this._userId = param.userId;
    this._comments = param.comments;
    this._createdAt = param.createdAt;
    this._updatedAt = param.updatedAt;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get userId(): number {
    return this._userId;
  }

  get comments(): Comment[] {
    return this._comments;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
