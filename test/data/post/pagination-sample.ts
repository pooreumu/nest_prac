import { Post } from '@src/api/post/entities/post.entity';

export function paginationSample(userId: number) {
  return [
    Post.createPost({
      title: 'title1',
      content: 'content1',
      userId,
    }),
    Post.createPost({
      title: 'title2',
      content: 'content2',
      userId,
    }),
    Post.createPost({
      title: 'title3',
      content: 'content3',
      userId,
    }),
    Post.createPost({
      title: 'title4',
      content: 'content4',
      userId,
    }),
    Post.createPost({
      title: 'title5',
      content: 'content5',
      userId,
    }),
    Post.createPost({
      title: 'title6',
      content: 'content6',
      userId,
    }),
    Post.createPost({
      title: 'title7',
      content: 'content7',
      userId,
    }),
    Post.createPost({
      title: 'title8',
      content: 'content8',
      userId,
    }),
    Post.createPost({
      title: 'title9',
      content: 'content9',
      userId,
    }),
  ];
}
