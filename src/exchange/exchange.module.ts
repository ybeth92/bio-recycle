import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exchange } from './exchange.entity';
import { ServiceModule } from 'src/service/service.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exchange]),
    ServiceModule,
    UserModule],
  providers: [ExchangeService],
  controllers: [ExchangeController],
  exports: [ExchangeService]
})
export class ExchangeModule { }
