import {DefaultCrudRepository} from '@loopback/repository';
import {order_detail} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrderDetailRepository extends DefaultCrudRepository<
  order_detail,
  typeof order_detail.prototype.item_id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(order_detail, dataSource);
  }
}
