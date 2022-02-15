import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceService } from 'src/service/service.service';
import { UserService } from 'src/user/user.service';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { Exchange } from './exchange.entity';
import { ExchangeRepository } from './exchange.repository';

@Injectable()
export class ExchangeService {

    constructor(
        @InjectRepository(Exchange)
        private readonly exchangeRepository: ExchangeRepository,
        private userService: UserService,
        private serviceService: ServiceService
        ){}

        async exchangeService(id: number, dto: CreateExchangeDto){

            const newExchange = new Exchange();
            const user = await this.userService.findById(id);
            const service = await this.serviceService.findById(dto.service);
            const num = 18;
            const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result1= ' ';
            const charactersLength = characters.length;

            newExchange.user = user;
            newExchange.service = service;
            newExchange.discount = dto.discount/100;
            newExchange.totalAmount = service.price - (service.price * (dto.discount/100));

            for ( let i = 0; i < num; i++ ) {
                result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            newExchange.code = result1

            const response = await this.exchangeRepository.save(newExchange);

            return {
                messages: 'Canjeo de cupos exitoso',
                response
            }
        }
}
