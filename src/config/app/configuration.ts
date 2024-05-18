import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.PORT || 4000,
  jwt_secret: process.env.JWT_SECRET,
}));
