import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address{
    @PrimaryGeneratedColumn() //Primary key
    id: number;
    @Column()
    via: string;
    @Column()
    name: string;
    @Column()
    number: string;
    @Column()
    zip_code: string;
    @Column()
    city: string;
    @Column()
    country: string;
    @Column({default: 0})
    recommendations: number;

    // Entities relations
    @JoinTable()
    @ManyToOne(
        tupe => User,
        user => user.address,
        {onUpdate: 'CASCADE', onDelete: 'CASCADE'},
    )
    user: User;
    
}