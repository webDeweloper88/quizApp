// src/configurations/index.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  db_port: parseInt(process.env.DB_PORT, 10) || 5432,
  db_host: process.env.DB_HOST || 'localhost',
  db_user: process.env.DB_USER || 'admin',
  db_password: process.env.DB_PASSWORD || 'admin',
  db_name: process.env.DB_NAME || 'quizDb',
  secret_jwt: process.env.SECRET_JWT || 'adminSecret',
  expire_jwt: process.env.EXPIRE_JWT || '2h',
});
