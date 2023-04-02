// 📦 Package imports
import { FindOptionsSelect } from 'typeorm';

// 🌏 Project imports
import { Post } from './post.entity';

export class SelectPostModel implements FindOptionsSelect<Post> {
  id?: boolean;
  title?: boolean;
  content?: boolean;
  authorId?: boolean;
  password?: boolean;
  createdAt?: boolean;
  updatedAt?: boolean;

  public static selectPostList() {
    const selectPostModel = new SelectPostModel();
    selectPostModel.id = true;
    selectPostModel.title = true;
    selectPostModel.authorId = true;
    selectPostModel.createdAt = true;
    selectPostModel.updatedAt = true;

    return selectPostModel;
  }

  public static selectPost() {
    const selectPostModel = new SelectPostModel();
    selectPostModel.id = true;
    selectPostModel.title = true;
    selectPostModel.content = true;
    selectPostModel.authorId = true;
    selectPostModel.createdAt = true;
    selectPostModel.updatedAt = true;

    return selectPostModel;
  }
}

export class PostModel {
  private readonly _page: number;
  private readonly _size: number;

  constructor(page: number, size: number) {
    this._page = page;
    this._size = size;
  }

  getOffset() {
    return (this._page - 1) * this._size;
  }

  getLimit() {
    return this._size;
  }
}
