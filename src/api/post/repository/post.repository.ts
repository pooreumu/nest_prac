import { Post } from '@post/entities/post.entity';
import { PostModel } from '@post/entities/post.model';

export interface PostRepository {
  createPost: (post: Post) => Promise<Post>;
  getPost: (id: number) => Promise<Post>;
  getPosts: (post: PostModel) => Promise<[Post[], number]>;
  updatePost: (post: Post) => Promise<Post>;
  deletePost: (post: Post) => Promise<void>;
}

export const POST_REPOSITORY = Symbol('POST_REPOSITORY');
