import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
} from '@loopback/rest';
import { category } from '../models';
import { CategoryRepository } from '../repositories';

export class CategoryController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) { }

  @get('/categories', {
    responses: {
      '200': {
        description: 'Array of Category model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': category } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(category)) filter?: Filter,
  ): Promise<category[]> {
    return await this.categoryRepository.find(filter);
  }

  @get('/categories/{id}', {
    responses: {
      '200': {
        description: 'Category model instance',
        content: { 'application/json': { schema: { 'x-ts-type': category } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<category> {
    return await this.categoryRepository.findById(id);
  }
}
