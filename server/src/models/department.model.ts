import { Entity, model, property } from '@loopback/repository';

@model()
export class department extends Entity {
  @property({
    type: 'number',
    id: true,
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


  constructor(data?: Partial<department>) {
    super(data);
  }
}
