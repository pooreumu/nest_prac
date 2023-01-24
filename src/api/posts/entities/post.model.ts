// 📦 Package imports
import {
  FindOptionsOrder,
  FindOptionsOrderValue,
  FindOptionsSelect,
} from 'typeorm';

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
export class OrderPostModel implements FindOptionsOrder<Post> {
  id?: FindOptionsOrderValue;
  title?: FindOptionsOrderValue;
  content?: FindOptionsOrderValue;
  authorId?: FindOptionsOrderValue;
  password?: FindOptionsOrderValue;
  createdAt?: FindOptionsOrderValue;
  updatedAt?: FindOptionsOrderValue;

  public static orderPostList() {
    const orderPostModel = new OrderPostModel();
    orderPostModel.id = 'desc';

    return orderPostModel;
  }
}
