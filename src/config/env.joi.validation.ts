import Joi from 'joi';

export const EnvJoiValidationSchema = Joi.object({
  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.string().required(),
  ENV: Joi.string().default('dev'),
});
