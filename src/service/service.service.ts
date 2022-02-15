import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServiceRepository } from './service.repository';

@Injectable()
export class ServiceService {

    constructor(
        @InjectRepository(Service)
        private readonly serviceRepository: ServiceRepository
    ) { }

    async findById(id: number){
        const service = await this.serviceRepository.findOne(id);
        if(!service){
            throw new NotFoundException({message: "Servicio no existe"})
        }
        return service;
    }

}
