import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: 'test@test.com' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'email' })
  @Expose()
  provider: string;

  @ApiProperty({ example: '1231231' })
  @Expose()
  socialId: string;

  @ApiProperty({ example: '사용자명' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'active' })
  @Expose()
  status: string;
}
