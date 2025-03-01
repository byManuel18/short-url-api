export const EnvConfiguration = () => ({
  environment: process.env.ENV || 'dev',
  port: process.env.PORT || 3000,
  db_name: process.env.DB_NAME,
  db_password: process.env.DB_PASSWORD,
  db_username: process.env.DB_USERNAME,
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  jwt_secret: process.env.JWT_SECRET,
});
