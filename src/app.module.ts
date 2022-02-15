import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TYPEORM_CONFIG } from './config/constans';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { ServiceModule } from './service/service.module';
import { ExchangeModule } from './exchange/exchange.module';
import databaseConfig from './config/database.config';
import { Middleware } from './middlewares/middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (config: ConfigService) =>
    config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
  }),
  ConfigModule.forRoot({
    envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
    isGlobal: true,
    load:[databaseConfig],
  }),
  RoleModule,
  UserModule,
  AuthModule,
  CityModule,
  ServiceModule,
  ExchangeModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Middleware)
      .exclude(
        
        )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
