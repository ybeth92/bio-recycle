import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './city.entity';
import { CityRepository } from './city.repository';

@Injectable()
export class CityService {

    constructor(
    @InjectRepository(City)
    private readonly cityRepository: CityRepository
    ){}

    async findById(id: number): Promise<City>{
        return await this.cityRepository.findOne(id);
    }

    async getAll(): Promise<City[]>{
        return await this.cityRepository.find();
    }

}
