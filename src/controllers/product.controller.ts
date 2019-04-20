import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
} from '@loopback/rest';
import { product } from '../models';
import { ProductRepository } from '../repositories';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

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

  @get('/products/{id}', {
    responses: {
      '200': {
        description: 'A product object which matches the id',
        content: { 'application/json': { schema: { 'x-ts-type': product } } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<product> {
    return await this.productRepository.findById(id);
  }

  @get('products/category/{id}', {
    responses: {
      '200': {
        description: 'Array of products which match a category id',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': product } },
          },
        },
      },
    },
  })
  async findByCategory(@param.path.number('id') id: number,
  ): Promise<any> {
    return await this.productRepository.execute(
      'CALL catalog_get_category_products(?)',
      [id]
    );
  }

  @get('/products/attributes/{id}', {
    responses: {
      '200': {
        description: 'A product object which matches the id',
        content: { 'application/json': { schema: { 'x-ts-type': product } } },
      },
    },
  })
  async findAttributes(@param.path.number('id') id: number): Promise<any> {
    return await this.productRepository.execute(
      'CALL catalog_get_product_attributes(?)',
      [id]
    );
  }
}
