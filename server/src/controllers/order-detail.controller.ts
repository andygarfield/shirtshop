import {
  repository,
} from '@loopback/repository';
import {
  post,
  requestBody,
} from '@loopback/rest';
import {order_detail} from '../models';
import {OrderDetailRepository} from '../repositories';

export class OrderDetailController {
  constructor(
    @repository(OrderDetailRepository)
    public orderDetailRepository : OrderDetailRepository,
  ) {}

  @post('/order-detail', {
    responses: {
      '200': {
        description: 'OrderDetail model instance',
        content: {'application/json': {schema: {'x-ts-type': order_detail}}},
      },
    },
  })
  async create(@requestBody() orderDetail: order_detail): Promise<order_detail> {
    return await this.orderDetailRepository.create(orderDetail);
  }
}
