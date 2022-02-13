import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { RoleModule } from 'src/role/role.module';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository]),
  RoleModule,
  CityModule
],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}

