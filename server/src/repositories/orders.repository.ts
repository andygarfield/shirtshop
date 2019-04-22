import {DefaultCrudRepository} from '@loopback/repository';
import {orders} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrdersRepository extends DefaultCrudRepository<
  orders,
  typeof orders.prototype.order_id
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(orders, dataSource);
  }
}
