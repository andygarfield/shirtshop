import {
  repository,
} from '@loopback/repository';
import {
  post,
  requestBody,
} from '@loopback/rest';
import {orders} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersController {
  constructor(
    @repository(OrdersRepository)
    public ordersRepository : OrdersRepository,
  ) {}

  @post('/orders', {
    responses: {
      '200': {
        description: 'Orders model instance',
        content: {'application/json': {schema: {'x-ts-type': orders}}},
      },
    },
  })
  async create(@requestBody() orders: orders): Promise<orders> {
    return await this.ordersRepository.create(orders);
  }
}
