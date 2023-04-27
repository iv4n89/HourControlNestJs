import { User } from "src/user/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'hour-controls' })
export class HourControl {

    @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
    id: number;

    @ManyToOne(() => User, (user) => user.hourControls)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar', { name: 'start_date', nullable: false })
  startDate: string;

  @Column('varchar', { name: 'start_hour', nullable: false })
  startHour: string;

  @Column('varchar', { name: 'finish', nullable: true })
  finish: string;

  @Column('int', { name: 'pause', nullable: true })
  pause: number;

  @Column('int', { name: 'is_paused', nullable: false, default: 0 })
  isPaused: number = 0;

  @Column('int', { name: 'pause_start', nullable: true })
  pauseStart: number;

  @Column('int', { nullable: true })
  startYear: number;

  @Column('int', { nullable: true })
  startMonth: number;

  @Column('int', { nullable: true })
  startDay: number;

  @BeforeInsert()
  getVirtualColumns() {
    const splittedDate = this.startDate.split('-').map(Number);
    this.startYear = splittedDate[0];
    this.startMonth = splittedDate[1];
    this.startDay = splittedDate[2];
  }

}
