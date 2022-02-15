import { Exchange } from "src/exchange/exchange.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'services' })
export class Service {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    business: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    price: number;

    @OneToMany(type => Exchange, exchange => exchange.service)
    exchanges: Exchange[];
}
