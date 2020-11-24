import { DeepPartial, DeleteResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EntityId } from 'typeorm/repository/EntityId';
export interface IBaseService<T> {
  getById(id: EntityId): Promise<T>;

  getById(id: EntityId, relations: string[]): Promise<T>;

  getByIds(ids: [EntityId]): Promise<T[]>;

  getByIds(ids: [EntityId], relations: string[]): Promise<T[]>;

  create(payload: DeepPartial<T>): Promise<T>;

  update(id: EntityId, payload: QueryDeepPartialEntity<T>): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
