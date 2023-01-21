// 📦 Package imports
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LocalDateTime } from '@js-joda/core';

// 🌏 Project imports
import { LocalDateTimeTransformer } from '../../lib/transformer/LocalDateTimeTransformer';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
    comment: '게시글 제목',
  })
  title: string;

  @Column({
    name: 'content',
    type: 'varchar',
    comment: '게시글 내용',
  })
  content: string;

  @Column({
    name: 'author_id',
    type: 'varchar',
    comment: '게시글 작성자 아이디',
  })
  authorId: string;

  @Column({
    name: 'password',
    type: 'varchar',
    comment: '게시글 비밀번호',
    nullable: true,
  })
  password: string;

  @Column({
    name: 'membership',
    type: 'bool',
    comment: '회원 여부',
  })
  membership: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    comment: '게시글 게시 시간',
  })
  createdAt: LocalDateTime | Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    comment: '게시글 수정 시간',
    transformer: new LocalDateTimeTransformer(),
    nullable: true,
  })
  updatedAt: LocalDateTime | Date;

  static createPost(postData: {
    title: string;
    content: string;
    authorId: string;
    password: string;
    membership: boolean;
    createdAt: LocalDateTime;
  }): Post {
    const post = new Post();
    post.title = postData.title;
    post.content = postData.content;
    post.authorId = postData.authorId;
    post.password = postData.password;
    post.membership = postData.membership;
    post.createdAt = postData.createdAt;

    return post;
  }

  static updatePost(postData: {
    postId: number;
    password: string;
    title?: string;
    content?: string;
    updatedAt: LocalDateTime;
  }): { wherePost: Post; updatePost: Post } {
    const wherePost = new Post();
    wherePost.id = postData.postId;
    wherePost.password = postData.password;

    const updatePost = new Post();
    updatePost.title = postData.title;
    updatePost.content = postData.content;
    updatePost.updatedAt = postData.updatedAt;

    return { wherePost: wherePost, updatePost: updatePost };
  }

  static byPk(postData: { id: number }): Post {
    const post = new Post();
    post.id = postData.id;

    return post;
  }

  static deleteBy(postData: { id: number; password: string }): Post {
    const post = new Post();
    post.id = postData.id;
    post.password = postData.password;

    return post;
  }
}
