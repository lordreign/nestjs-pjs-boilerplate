import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from '../typeorm-config.service';
// import { createConnection } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [TypeOrmConfigService],
})
class AppModule {}

const setConfig = async () => {
  const app = await NestFactory.create(AppModule);
  const typeOrmServiceConfig = app.get(TypeOrmConfigService);
  const options = typeOrmServiceConfig.createTypeOrmOptions();
  fs.writeFileSync(
    `ormconfig.${process.env.NODE_ENV}.json`,
    JSON.stringify(options, null, 2),
  );
  console.log(`ormconfig.${process.env.NODE_ENV}.json 생성완료`);
  // const connection = await createConnection(options);
  // await connection.query(`CREATE DATABASE IF NOT EXISTS ${options.database}`);
  // await connection.close();
  // console.log(`database(${options.database}) 체크 완료`);

  await app.close();
};

void setConfig();
