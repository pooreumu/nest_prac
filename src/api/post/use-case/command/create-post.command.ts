import { Post } from '../../entities/post.entity';

export class CreatePostCommand {
  private readonly _title: string;
  private readonly _content: string;
  private readonly _userId: number;

  constructor(postData: { title: string; content: string; userId: number }) {
    this._title = postData.title;
    this._content = postData.content;
    this._userId = postData.userId;
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
    return Post.createPost({
      title: this._title,
      content: this._content,
      userId: this._userId,
    });
  }
}
