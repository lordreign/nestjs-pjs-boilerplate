import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JwtUserRespDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'test@test.com' })
  @Expose()
  email: string;
}
