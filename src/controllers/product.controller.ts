import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { product } from '../models';
import { ProductRepository } from '../repositories';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @post('/products', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: { 'x-ts-type': product } } },
      },
    },
  })
  async create(@requestBody() product: product): Promise<product> {
    return await this.productRepository.create(product);
  }

  @get('/products/count', {
    responses: {
      '200': {
        description: 'Product model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(product)) where?: Where,
  ): Promise<Count> {
    return await this.productRepository.count(where);
  }

  @get('/products', {
    responses: {
      '200': {
        description: 'Array of Product model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': product } },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(product)) filter?: Filter,
  ): Promise<product[]> {
    return await this.productRepository.find(filter);
  }

  @patch('/products', {
    responses: {
      '200': {
        description: 'Product PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody() product: product,
    @param.query.object('where', getWhereSchemaFor(product)) where?: Where,
  ): Promise<Count> {
    return await this.productRepository.updateAll(product, where);
  }

  @get('/products/{id}', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: { 'x-ts-type': product } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<product> {
    return await this.productRepository.findById(id);
  }

  @patch('/products/{id}', {
    responses: {
      '204': {
        description: 'Product PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() product: product,
  ): Promise<void> {
    await this.productRepository.updateById(id, product);
  }

  @put('/products/{id}', {
    responses: {
      '204': {
        description: 'Product PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() product: product,
  ): Promise<void> {
    await this.productRepository.replaceById(id, product);
  }

  @del('/products/{id}', {
    responses: {
      '204': {
        description: 'Product DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productRepository.deleteById(id);
  }
}
