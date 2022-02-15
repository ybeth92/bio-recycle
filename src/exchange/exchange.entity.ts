import { Service } from "src/service/service.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'exchanges' })
export class Exchange {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @ManyToOne(() => User, user => user.exchanges)
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;

    @ManyToOne(() => Service, service => service.exchanges)
    @JoinColumn([{ name: "service_id", referencedColumnName: "id" }])
    service: Service;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    discount: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
    totalAmount: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    code: string;
}