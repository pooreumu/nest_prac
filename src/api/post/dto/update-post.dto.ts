import { Post } from '../entities/post.entity';

export class UpdatePostDto {
  private readonly _postId: number;
  private readonly _userId: number;
  private readonly _title: string;
  private readonly _content: string;

  constructor(postData: {
    postId: number;
    userId: number;
    title?: string;
    content?: string;
  }) {
    this._postId = postData.postId;
    this._title = postData.title;
    this._content = postData.content;
    this._userId = postData.userId;
  }

  public get postId(): number {
    return this._postId;
  }

  public get title(): string {
    return this._title;
  }

  public get content(): string {
    return this._content;
  }

  public get userId(): number {
    return this._userId;
  }

  public toEntity() {
    return Post.updatePost({
      postId: this._postId,
      title: this._title,
      content: this._content,
      userId: this._userId,
    });
  }
}
