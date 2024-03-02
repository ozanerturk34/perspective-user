export default () => ({
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: process.env.TYPEORM_AUTO_LOAD_ENTITIES === 'true',
    synchronize: process.env.TYPEORM_SYNCRONIZE === 'true',
  },
});
