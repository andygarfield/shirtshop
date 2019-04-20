import { DefaultCrudRepository } from '@loopback/repository';
import { product } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class ProductRepository extends DefaultCrudRepository<
  product,
  typeof product.prototype.product_id
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(product, dataSource);
  }
}
