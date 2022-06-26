import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  // url: process.env.DATABASE_URL,
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  maxConnections: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 10,

  // synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  // sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
  // rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
  // ca: process.env.DATABASE_CA,
  // key: process.env.DATABASE_KEY,
  // cert: process.env.DATABASE_CERT,
}));
