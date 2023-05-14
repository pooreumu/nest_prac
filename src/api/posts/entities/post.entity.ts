// 📦 Package imports
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

// 🌏 Project imports
import { BaseTimeEntity } from '@lib/entity/base-time-entity';

import { Comment } from '@comments/entities/comment.entity';

import { User } from '@users/entities/user.entity';

@Entity()
export class Post extends BaseTimeEntity {
  @Column({
    type: 'varchar',
    comment: '게시글 제목',
  })
  title: string;

  @Column({
    type: 'varchar',
    comment: '게시글 내용',
  })
  content: string;

  @Column({
    comment: '게시글 작성자 아이디',
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.posts, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  static createPost(postData: {
    title: string;
    content: string;
    userId: number;
  }): Post {
    const post = new Post();
    post.title = postData.title;
    post.content = postData.content;
    post.userId = postData.userId;

    return post;
  }

  static updatePost(postData: {
    postId: number;
    userId: number;
    title?: string;
    content?: string;
  }): { wherePost: Post; updatePost: Post } {
    const wherePost = new Post();
    wherePost.id = postData.postId;
    wherePost.userId = postData.userId;

    const updatePost = new Post();
    updatePost.title = postData.title;
    updatePost.content = postData.content;

    return { wherePost: wherePost, updatePost: updatePost };
  }

  static byPk(postData: { id: number }): Post {
    const post = new Post();
    post.id = postData.id;

    return post;
  }

  static deleteBy(postData: { id: number; userId: number }): Post {
    const post = new Post();
    post.id = postData.id;
    post.userId = postData.userId;

    return post;
  }
}
