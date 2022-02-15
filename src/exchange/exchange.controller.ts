import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Users } from 'src/common/decorator';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/utils/enum/role.enum';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { ExchangeService } from './exchange.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api/v1/exchange')
export class ExchangeController {

    constructor(
        private readonly exchangeService: ExchangeService
    ) { }

    @Roles(RoleName.DONOR)
    @Post()
    async create(@Users() user: any, @Body() dto: CreateExchangeDto) {
        const exchange = await this.exchangeService.exchangeService(user.id, dto);
        return exchange;
    }
}
