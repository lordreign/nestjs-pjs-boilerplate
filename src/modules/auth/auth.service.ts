import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserProvidersEnum } from 'src/common/enums/user-providers.enum';
import { UsersService } from '../users/users.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/entities/user.entity';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async validateLogin(
    loginDto: AuthEmailLoginDto,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: '이메일을 다시 한번 확인해주세요.',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (user.provider !== UserProvidersEnum.email) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: `${user.provider}로 로그인해주세요.`,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (isValidPassword) {
      const accessToken = await this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: this.configService.get('auth.expires.access'),
        },
      );

      // refresh token도 발급...
      const refreshToken = await this.jwtService.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: this.configService.get('auth.expires.refresh'),
        },
      );
      // TODO redis와 같은 곳에 토큰들을 등록한다.
      // refresh로 access 토큰 발급 시 검증 redis에 있는 토큰과 비교

      return { accessToken, refreshToken, user: user };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: '',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async me(user: User): Promise<User> {
    return this.usersService.findOne({
      id: user.id,
    });
  }
}
