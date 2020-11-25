import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class MyBaseEntity<T extends BaseEntity> extends BaseEntity {
  constructor(pt: Partial<T>) {
    super();
    Object.assign(this, pt);
  }

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;
}
