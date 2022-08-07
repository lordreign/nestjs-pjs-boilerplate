import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PagingDto } from 'src/common/dto/paging.dto';
import { UserProvidersEnum } from 'src/common/enums/user-providers.enum';
import { UserStatusEnum } from 'src/common/enums/user-status.enum';

export class SearchUserDto {
  @ApiPropertyOptional({ example: 'test1@example.com', description: '이메일' })
  @IsOptional()
  email?: string | null;

  @ApiPropertyOptional({ description: '제공업체' })
  @IsOptional()
  @IsEnum(UserProvidersEnum)
  provider?: UserProvidersEnum | null;

  @ApiPropertyOptional({ description: '소셜 아이디' })
  @IsOptional()
  socialId?: string | null;

  @ApiPropertyOptional({ description: '이름' })
  @IsOptional()
  name?: string | null;

  @ApiPropertyOptional({ description: '회원상태' })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum | null;
}

export class SearchUserPagingDto extends IntersectionType(
  SearchUserDto,
  PagingDto,
) {}
