import { EntityRepository, Repository } from "typeorm";
import { City } from "./city.entity";

@EntityRepository(City)
export class CityRepository extends Repository<City>{

    
}