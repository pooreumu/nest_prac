// 📦 Package imports
import { LocalDateTime } from '@js-joda/core';
import {
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

// 🌏 Project imports
import { LocalDateTimeTransformer } from '../transformer/local-date-time-transformer';

@Entity()
export class BaseEntity {
  @Generated('increment')
  @PrimaryColumn({ type: 'int' })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '생성 시간',
    transformer: new LocalDateTimeTransformer(),
  })
  createdAt: LocalDateTime | Date;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '수정 시간',
    transformer: new LocalDateTimeTransformer(),
  })
  updatedAt: LocalDateTime | Date;
}
