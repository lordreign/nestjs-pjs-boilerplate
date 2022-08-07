import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserPagingDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { IResponse } from 'src/common/interfaces/response.interface';
import { ResponseSerialize } from 'src/interceptors/response.interceptor';
import { PageSupport } from 'src/common/supports/page.support';

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
@ResponseSerialize(UserDto)
export class UsersController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: '사용자 생성', description: '사용자를 생성한다.' })
  @ApiBody({
    description: '사용자 생성 DTO',
    type: CreateUserDto,
  })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: UserDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { data: user, message: '사용자 생성 완료' } as IResponse;
  }

  @ApiOperation({ summary: '사용자 단건 조회' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 아이디',
  })
  @ApiCreatedResponse({ type: UserDto })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number) {
    return {
      data: await this.usersService.findOne({ id }),
    } as IResponse;
  }

  @ApiOperation({ summary: '사용자 목록 조회' })
  @ApiCreatedResponse({ type: PageSupport })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: SearchUserPagingDto) {
    return { data: await this.usersService.findSearchPage(query) } as IResponse;
  }

  @ApiOperation({ summary: '사용자 수정' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 아이디',
  })
  @ApiBody({
    description: '사용자 수정 DTO',
    type: UpdateUserDto,
  })
  @ApiCreatedResponse({ type: UserDto })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    if (id === updateUserDto.id) {
      return {
        data: await this.usersService.update(updateUserDto),
      } as IResponse;
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: '필수파라미터 에러',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
