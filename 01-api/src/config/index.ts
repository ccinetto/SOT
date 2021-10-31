import dotenv from 'dotenv';

dotenv.config();

const Config = {
  PORT: process.env.PORT || 8080,
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'usuario',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'password',
  MYSQL_ENV: process.env.MYSQL_ENV || 'stg',
  MONGO_SRV: process.env.MONGO_SRV || 'misrv',
};

export default Config;
