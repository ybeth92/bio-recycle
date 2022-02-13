import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { messages } from 'src/lib/constanst';
import { PayloadInterface } from './interface/payload.interface';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail({ email: email });
        if (!user.isActive) throw new UnauthorizedException(messages.userInactive);
        if (user && await compare(password, user.password)) {
            const { password, ...rest } = user
            return rest;
        }
        return null;
    }

    async login(user: User) {
        const { id, ...rest } = user;
        const payload: PayloadInterface = { role: user.role, id: user.id };
        
        const accessToken = this.jwtService.sign(payload);
        
        const response = {
            id,
            ...rest,
            accessToken
        }
        return response;
    }
}

