import { EnvKeys, Environments } from './interfaces';

export const EnvConfiguration = () => ({
  [EnvKeys.ENV]: process.env.ENV || Environments.DEV,
  [EnvKeys.PORT]: process.env.PORT || 3000,
  [EnvKeys.DB_NAME]: process.env.DB_NAME,
  [EnvKeys.DB_PASSWORD]: process.env.DB_PASSWORD,
  [EnvKeys.DB_USERNAME]: process.env.DB_USERNAME,
  [EnvKeys.DB_HOST]: process.env.DB_HOST,
  [EnvKeys.DB_PORT]: process.env.DB_PORT,
  [EnvKeys.JWT_SECRET]: process.env.JWT_SECRET,
  [EnvKeys.JWT_EXPIRES]: process.env.JWT_EXPIRES,
});
