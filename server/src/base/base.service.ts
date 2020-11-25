import { BaseEntity, DeepPartial, DeleteResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityId } from 'typeorm/repository/EntityId';

export abstract class BaseService<T extends BaseEntity> {
  constructor(private readonly repo: Repository<T>) {}

  getByPartial(pt: QueryDeepPartialEntity<T>, relations?: string[]) {
    return this.repo.findOne({
      where: pt,
      relations,
    });
  }

  getById(id: EntityId, relations?: string[]): Promise<T> {
    return this.repo.findOne(id, { relations });
  }
  getByIds(ids: [EntityId], relations?: string[]): Promise<T[]> {
    return this.repo.findByIds(ids, { relations });
  }
  create(payload: DeepPartial<T>): Promise<T> {
    return this.repo.save(payload);
  }
  async update(id: EntityId, payload: QueryDeepPartialEntity<T>): Promise<T> {
    const record = await this.getById(id);
    Object.assign(record, payload);
    return record.save();
  }
  delete(id: EntityId): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
