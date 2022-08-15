import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires: {
    access: process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRES_IN,
    refresh: process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN,
  },
}));
