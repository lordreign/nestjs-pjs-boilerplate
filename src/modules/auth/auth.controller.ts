import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { AuthService } from './auth.service';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseSerialize } from 'src/interceptors/response.interceptor';
import { JwtRespDto } from './dto/jwt-resp.dto';
import { JwtUserRespDto } from './dto/jwt-user-resp.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '이메일 로그인',
    description: '이메일로 로그인한다.',
  })
  @ApiBody({
    description: '이메일 로그인 DTO',
    type: AuthEmailLoginDto,
  })
  @ApiCreatedResponse({ description: 'JWT DTO', type: JwtRespDto })
  @Post('email/login')
  @HttpCode(HttpStatus.OK)
  @ResponseSerialize(JwtRespDto)
  async login(@Body() loginDto: AuthEmailLoginDto) {
    const result = await this.authService.validateLogin(loginDto);
    return { data: result, message: '로그인되었습니다.' };
  }

  @ApiOperation({
    summary: '사용자 정보 확인',
    description: 'JWT 토큰의 사용자를 확인한다.',
  })
  @ApiCreatedResponse({ description: 'JWT DTO', type: JwtRespDto })
  @ApiBearerAuth()
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @ResponseSerialize(JwtUserRespDto)
  async me(@Request() request) {
    return { data: await this.authService.me(request.user) };
  }
}
