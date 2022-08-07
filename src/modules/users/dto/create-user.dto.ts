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
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com', description: '이메일' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsNotExist, ['User'], {
    message: 'Email이 존재합니다.',
  })
  email: string;

  // TODO 비밀번호 정규식 validate 처리
  // 관련 정규식: "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
  @ApiProperty({ description: '비밀번호' })
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: UserProvidersEnum, description: '제공업체' })
  @IsEnum(UserProvidersEnum)
  provider: UserProvidersEnum = UserProvidersEnum.email;

  @ApiProperty({ description: '소셜 아이디' })
  @IsOptional()
  socialId?: string | null;

  @ApiProperty({ description: '이름' })
  @IsOptional()
  name?: string | null;

  @ApiProperty({ enum: UserStatusEnum, description: '회원상태' })
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum = UserStatusEnum.active;
}
