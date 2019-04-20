import { Entity, model, property } from '@loopback/repository';

@model()
export class product extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  product_id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  discounted_price: number;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @property({
    type: 'string',
    required: true,
  })
  image_2: string;

  @property({
    type: 'string',
    required: true,
  })
  thumbnail: string;

  @property({
    type: 'number',
  })
  display: number;


  constructor(data?: Partial<product>) {
    super(data);
  }
}
