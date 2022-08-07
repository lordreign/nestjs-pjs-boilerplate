import { ApiProperty } from '@nestjs/swagger';
import * as _ from 'lodash';

export class PageSupport<T> {
  @ApiProperty({ example: 20 })
  totalCount: number;
  @ApiProperty({ example: 2 })
  totalPage: number;
  @ApiProperty({ example: '[]' })
  list: T[];
  @ApiProperty({ example: 1 })
  page: number;
  @ApiProperty({ example: 10 })
  pageSize: number;

  constructor(totalCount: number, list: T[], page: number, pageSize: number) {
    this.totalCount = totalCount;
    this.totalPage = _.ceil(totalCount / pageSize);
    this.list = list;
    this.page = page;
    this.pageSize = pageSize;
  }
}
