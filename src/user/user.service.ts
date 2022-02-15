import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityService } from 'src/city/city.service';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

export interface UserInterface {
    id?: number;
    email?: string;
    username?: string;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: UserRepository,
        private roleService: RoleService,
        private cityService: CityService
    ) { }

    async findById(id: number) {
        return await this.userRepository
            .createQueryBuilder('user')
            .where({ id: id })
            .innerJoinAndSelect('user.role', 'role')
            .getOne();
    }

    async findByEmail(data: UserInterface) {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where({ email: data.email })
            .addSelect('user.password')
            .innerJoinAndSelect('user.role', 'role')
            .getOne();
        return user;
    }

    async createUser(dto: CreateUserDto) {
        const newUser = new User();
        const idRole = 2;
        const users = await this.userRepository.find();
        const role = await this.roleService.findById(idRole);
        const city = await this.cityService.findById(dto.city);
    
        newUser.name = dto.name;
        newUser.lastName = dto.lastName;
        newUser.mothersLastName = dto.mothersLastName;
    
        let dni = users.find(user => user.dni == dto.dni);
        if (dni) {
          throw new NotFoundException('Dni ya existe')
        } else {
          newUser.dni = dto.dni;
        }
        
        newUser.email = dto.email;
        newUser.phone = dto.phone;
        newUser.password = dto.password;
        newUser.isActive = true;
        newUser.role = role;
        newUser.adress = dto.adress;
        newUser.city = city;
        newUser.point = 0;
  
        const user = await this.userRepository.save(newUser);
        delete user.password;
    
        return user;
      }
}

