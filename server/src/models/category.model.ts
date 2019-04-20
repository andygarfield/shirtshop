import { Entity, model, property } from '@loopback/repository';

@model({ settings: { "strict": false } })
export class category extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  category_id: number;

  @property({
    type: 'number',
    required: true,
  })
  department_id: number;

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

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<category>) {
    super(data);
  }
}
