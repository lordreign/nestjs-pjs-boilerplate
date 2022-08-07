import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/common/types/entity-condition.type';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageSupport } from 'src/common/supports/page.support';
import { Like, Repository } from 'typeorm';
import { SearchUserPagingDto } from './dto/search-user.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class UsersService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.save(this.userRepo.create(createUserDto));
  }

  async findOne(fields: EntityCondition<User>) {
    return await this.userRepo.findOne({
      where: fields,
    });
  }

  async findSearchPage(searchPagingDto: SearchUserPagingDto) {
    const totalCount = await this.userRepo.count();
    const list = await this.userRepo.find({
      where: {
        ...(searchPagingDto.email
          ? { email: Like(`%${searchPagingDto.email}%`) }
          : {}),
        ...(searchPagingDto.provider
          ? { provider: searchPagingDto.provider }
          : {}),
        ...(searchPagingDto.socialId
          ? { socialId: Like(`%${searchPagingDto.socialId}%`) }
          : {}),
        ...(searchPagingDto.name
          ? { name: Like(`%${searchPagingDto.name}%`) }
          : {}),
        ...(searchPagingDto.status ? { status: searchPagingDto.status } : {}),
      },
      ...(searchPagingDto.orderField
        ? {
            order: {
              [searchPagingDto.orderField]: searchPagingDto.orderBy,
            },
          }
        : {}),
      skip: (searchPagingDto.page - 1) * searchPagingDto.pageSize,
      take: searchPagingDto.pageSize,
    });

    return new PageSupport<User>(
      totalCount,
      list,
      searchPagingDto.page,
      searchPagingDto.pageSize,
    );
  }

  // 다른 방식
  // async findSearchPage(searchPagingDto: SearchUserPagingDto) {
  //   const qb = this.userRepo
  //     .createQueryBuilder()
  //     .from(User, 'user')
  //     .where('1=1');

  //   if (searchPagingDto.email) {
  //     qb.andWhere('user.email like :email', {
  //       email: `%${searchPagingDto.email}%`,
  //     });
  //   }

  //   if (searchPagingDto.provider) {
  //     qb.andWhere('user.provider like :provider', {
  //       provider: `%${searchPagingDto.provider}%`,
  //     });
  //   }

  //   if (searchPagingDto.socialId) {
  //     qb.andWhere('user.socialId like :socialId', {
  //       socialId: `%${searchPagingDto.socialId}%`,
  //     });
  //   }

  //   if (searchPagingDto.name) {
  //     qb.andWhere('user.name like :name', {
  //       name: `%${searchPagingDto.name}%`,
  //     });
  //   }

  //   if (searchPagingDto.status) {
  //     qb.andWhere('user.status like :status', {
  //       status: `%${searchPagingDto.status}%`,
  //     });
  //   }

  //   qb.offset((searchPagingDto.page - 1) * searchPagingDto.pageSize).limit(
  //     searchPagingDto.pageSize,
  //   );

  //   const result = await qb
  //     .disableEscaping() // escape character disable
  //     .getManyAndCount(); // 조회 및 총 개수 반환

  //   return new PageSupport<User>(
  //     result[1], // totalCount
  //     result[0], // list
  //     searchPagingDto.page,
  //     searchPagingDto.pageSize,
  //   );
  // }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userRepo.save(this.userRepo.create(updateUserDto));
  }
}
