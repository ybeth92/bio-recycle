import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorator/public.decorator';
import { CityService } from './city.service';

@Controller('/api/v1/city')
export class CityController {

    constructor(
        private readonly cityService: CityService
    ) { }

    @Public()
    @Get()
    async getAllCities() {
        return await this.cityService.getAll();
    }

}
