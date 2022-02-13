import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: RoleRepository
    ){}

    async findById(id: number): Promise<Role>{
        return await this.roleRepository.findOne(id);
    }
}