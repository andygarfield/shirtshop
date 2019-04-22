import {Entity, model, property} from '@loopback/repository';

@model()
export class order_detail extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  item_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  order_id: number;

  @property({
    type: 'number',
    required: true,
  })
  product_id: number;

  @property({
    type: 'string',
    required: true,
  })
  attributes: string;

  @property({
    type: 'string',
    required: true,
  })
  product_name: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  unit_cost: number;


  constructor(data?: Partial<order_detail>) {
    super(data);
  }
}
