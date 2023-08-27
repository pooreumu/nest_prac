import {
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '생성 시간',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '수정 시간',
  })
  updatedAt: Date;
}
