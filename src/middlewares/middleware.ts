import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

const boom = require('@hapi/boom');

@Injectable()
export class Middleware implements NestMiddleware {

    use(req: Request, res: Response, next: Function) {
        // console.log(req)
        // console.log(res)
        next();  
    }
}
