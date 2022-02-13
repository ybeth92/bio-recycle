import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/common/decorator/public.decorator';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleName } from 'src/utils/enum/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api/v1/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    //@Roles(RoleName.DONOR)
    @Public()
    @Post()
    async create(@Body() dto: CreateUserDto) {
        const data = await this.userService.createUser(dto);
        return { data, message: 'Usuario creado' };
    }
}

