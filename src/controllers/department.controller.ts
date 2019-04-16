import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
} from '@loopback/rest';
import { department } from '../models';
import { DepartmentRepository } from '../repositories';

export class DepartmentController {
  constructor(
    @repository(DepartmentRepository)
    public departmentRepository: DepartmentRepository,
  ) { }

  @get('/departments', {
    responses: {
      '200': {
        description: 'Array of Department model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': department } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(department)) filter?: Filter,
  ): Promise<department[]> {
    return await this.departmentRepository.find(filter);
  }

  @get('/departments/{id}', {
    responses: {
      '200': {
        description: 'Department model instance',
        content: { 'application/json': { schema: { 'x-ts-type': department } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<department> {
    return await this.departmentRepository.findById(id);
  }
}
