import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { JwtUserRespDto } from './jwt-user-resp.dto';

export class JwtRespDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC.......',
  })
  @Expose()
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZC.......',
  })
  @Expose()
  refreshToken: string;

  @ApiProperty({ type: JwtUserRespDto })
  @Type(() => JwtUserRespDto)
  @Expose()
  user: JwtUserRespDto;
}
