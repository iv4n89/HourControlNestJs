import { HourControl } from 'src/hour-control/entities/hour-control.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    
    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id: number;

    @Column('varchar', { name: 'username', nullable: false, unique: true })
    username: string;

    @OneToMany(() => HourControl, hourControl => hourControl.user)
    hourControls: HourControl[];

}
