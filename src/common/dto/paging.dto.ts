import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { toInt } from 'src/utils/helpers/cast.helper';
import { OrderByEnum } from '../enums/order-by.enum';

export class PagingDto {
  @ApiPropertyOptional({ default: 1, description: '페이지' })
  @Transform(({ value }) => toInt(value, { default: 1, min: 1 }))
  @IsNumber()
  page = 1;

  @ApiPropertyOptional({ default: 10, description: '페이지 크기' })
  @Transform(({ value }) => toInt(value, { default: 10 }))
  @IsNumber()
  pageSize = 10;

  @ApiPropertyOptional({ description: '정렬 필드' })
  @IsOptional()
  orderField?: string | null;

  @ApiPropertyOptional({
    enum: OrderByEnum,
    default: OrderByEnum.ASC,
    description: '정렬(ASC/DESC)',
  })
  @IsEnum(OrderByEnum)
  orderBy: string = OrderByEnum.ASC;
}
