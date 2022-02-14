 const { Sequelize }= require('sequelize');

const sequelize= new Sequelize('test-db','user','pass',
{
      "dialect": "sqlite",
      "storage": "./src/config/project.sqlite3"
}    )

module.exports= sequelize; 

/* const config = {
      service:{
        name: process.env.SERVICE_NAME || 'courses',
        host: process.env.SERVICE_HOST || '127.0.0.1',
        port: process.env.SERVICE_PORT || '8080',
      },
      cache:{
        driver: process.env.CACHE_DRIVER || null,
        redis:{
          host: process.env.REDIS_HOST || '127.0.0.1',
          port: process.env.REDIS_PORT || '6379',
          user: process.env.REDIS_USER || null,
          password: process.env.REDIS_PASSWORD || null,
        }
      },
      database:{
        driver: process.env.DB_DRIVER || null,
        sqlite3:{
        dialect: 'sqlite',
        port: process.env.SERVICE_PORT || 3800,
        host: 'localhost',
        USER: "user",
        PASSWORD: "pass",
        DB: "test-db",
        storage: "./src/config/project.sqlite3"
        } 
      } 
    }
    module.exports = config  */