import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
  Validate,
} from 'class-validator';
import { UserProvidersEnum } from 'src/common/enums/user-providers.enum';
import { UserStatusEnum } from 'src/common/enums/user-status.enum';
import { toInt } from 'src/utils/helpers/cast.helper';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class UpdateUserDto {
  @ApiProperty({ description: '아이디' })
  @Transform(({ value }) => toInt(value))
  @IsNotEmpty()
  @Validate(IsNotExist, ['User'], {
    message: '사용자가 존재하지 않습니다.',
  })
  id: number;

  @ApiProperty({ example: 'test1@example.com', description: '이메일' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsOptional()
  @Validate(IsExist, ['User'], {
    message: '이메일이 존재하지 않습니다.',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // TODO 비밀번호 정규식 validate 처리
  // 관련 정규식: "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
  @ApiProperty({ description: '비밀번호' })
  @IsOptional()
  @MinLength(8)
  password?: string;

  @ApiProperty({ description: '제공업체' })
  @IsOptional()
  @IsEnum(UserProvidersEnum)
  provider?: UserProvidersEnum;

  @ApiProperty({ description: '소셜 아이디' })
  socialId?: string | null;

  @ApiProperty({ description: '이름' })
  name?: string | null;

  @ApiProperty({ description: '회원상태' })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;
}
