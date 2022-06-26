import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type'),
      // url: this.configService.get('database.url'),
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      username: this.configService.get('database.username'),
      password: this.configService.get('database.password'),
      database: this.configService.get('database.database'),
      charset: 'UTF8_GENERAL_CI',
      timezone: '+00:00', // UTC
      // connectTimeout: 10000,
      // debug: false,
      // trace: true,
      synchronize: false,
      dropSchema: false,
      keepConnectionAlive: true,
      logging: this.configService.get('app.nodeEnv') !== 'production',
      entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
      factories: [__dirname + '/factories/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'src/database/subscriber',
      },
      extra: {
        // https://github.com/mysqljs/mysql 이쪽 option 확인 필요
        connectionLimit: this.configService.get('database.maxConnections'),
      },
    } as TypeOrmModuleOptions;
  }
}
