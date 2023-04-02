import { LocalDateTime } from '@js-joda/core';

import { Post } from '@posts/entities/post.entity';

export const paginationSample = [
  Post.createPost({
    title: 'title1',
    content: 'content1',
    authorId: 'authorId1',
    password: 'password1',
    createdAt: LocalDateTime.now(),
  }),
  Post.createPost({
    title: 'title2',
    content: 'content2',
    authorId: 'authorId2',
    password: 'password2',
    createdAt: LocalDateTime.now(),
  }),
  Post.createPost({
    title: 'title3',
    content: 'content3',
    authorId: 'authorId3',
    password: 'password3',
    createdAt: LocalDateTime.now(),
  }),
  Post.createPost({
    title: 'title4',
    content: 'content4',
    authorId: 'authorId4',
    password: 'password4',
    createdAt: LocalDateTime.now(),
  }),
  Post.createPost({
    title: 'title5',
    content: 'content5',
    authorId: 'authorId5',
    password: 'password5',
    createdAt: LocalDateTime.now(),
  }),
  Post.createPost({
    title: 'title6',
    content: 'content6',
    authorId: 'authorId6',
    password: 'password6',
    createdAt: LocalDateTime.now(),
  }),
  Post.createPost({
    title: 'title7',
    content: 'content7',
    authorId: 'authorId7',
    password: 'password7',
    createdAt: LocalDateTime.now(),
  }),
  Post.createPost({
    title: 'title8',
    content: 'content8',
    authorId: 'authorId8',
    password: 'password8',
    createdAt: LocalDateTime.now(),
  }),
  Post.createPost({
    title: 'title9',
    content: 'content9',
    authorId: 'authorId9',
    password: 'password9',
    createdAt: LocalDateTime.now(),
  }),
];
