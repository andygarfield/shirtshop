import {Entity, model, property} from '@loopback/repository';

@model()
export class orders extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  order_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  total_amount: number;

  @property({
    type: 'date',
    required: true,
  })
  created_on: string;

  @property({
    type: 'date',
  })
  shipped_on?: string;

  @property({
    type: 'number',
  })
  status?: number;

  @property({
    type: 'string',
  })
  comments?: string;

  @property({
    type: 'number',
  })
  customer_id?: number;

  @property({
    type: 'string',
  })
  auth_code?: string;

  @property({
    type: 'string',
  })
  reference?: string;

  @property({
    type: 'number',
  })
  shipping_id?: number;

  @property({
    type: 'number',
  })
  tax_id?: number;


  constructor(data?: Partial<orders>) {
    super(data);
  }
}
