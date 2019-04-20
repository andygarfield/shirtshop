import { DefaultCrudRepository } from '@loopback/repository';
import { category } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class CategoryRepository extends DefaultCrudRepository<
  category,
  typeof category.prototype.category_id
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(category, dataSource);
  }
}
