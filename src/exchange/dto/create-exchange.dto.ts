import { IsNotEmpty } from "class-validator";

export class CreateExchangeDto{

    @IsNotEmpty()
    service: number;

    @IsNotEmpty()
    discount: number;
}