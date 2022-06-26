import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss', // Local time by timezone
            }),
            nestWinstonModuleUtilities.format.nestLike('APP', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          filename: __dirname + '/../logs/app.log',
          maxsize: 1024 * 1024 * 20, // 20MB
          // zippedArchive: true,
          format: winston.format.combine(
            winston.format.timestamp({
              format: 'YYYY-MM-DD HH:mm:ss', // Local time by timezone
            }),
            nestWinstonModuleUtilities.format.nestLike('APP', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
  });
  const configService = app.get(ConfigService);

  app.enableShutdownHooks(); // if the process receives a special system signal (such as SIGTERM)
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // app.useGlobalInterceptors(new SerializerInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      exceptionFactory: (errors: ValidationError[]) =>
        new HttpException(
          {
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: errors.reduce(
              (accumulator, currentValue) => ({
                ...accumulator,
                [currentValue.property]: Object.values(
                  currentValue.constraints,
                ).join(', '),
              }),
              {},
            ),
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle(configService.get('app.name'))
    .setDescription(`The ${configService.get('app.name')} description`)
    .setVersion(configService.get('app.version'))
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));
}
bootstrap();
