import { DefaultCrudRepository } from '@loopback/repository';
import { department } from '../models';
import { MysqlDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class DepartmentRepository extends DefaultCrudRepository<
  department,
  typeof department.prototype.department_id
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(department, dataSource);
  }
}
