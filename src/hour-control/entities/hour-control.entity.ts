import moment from 'moment';
import { User } from 'src/user/entities/user.entity';
import {
  AfterInsert, BeforeInsert, BeforeUpdate, Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'hour-controls' })
export class HourControl {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
  id: number;

  @ManyToOne(() => User, (user) => user.hourControls)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('int', { name: 'start', nullable: false })
  start: number;

  @Column('int', { name: 'finish', nullable: true })
  end: number;

  @Column('int', { name: 'last_start', nullable: true })
  lastStart: number;

  @Column('int', { name: 'total', nullable: true })
  total: number;

  @Column('int', { name: 'ended', nullable: true, default: 0 })
  ended: number = 0;

  @Column('varchar', { name: 'human_date', nullable: true })
  humanDate: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('varchar', { name: 'total_human', nullable: true })
  totalHuman: string;

  @BeforeInsert()
  @BeforeUpdate()
  getTotal() {
    if (!this.ended) {
      return;
    }
    if (this.end && this.lastStart === this.start) {
      this.total = this.end - this.start;
    } else if (this.end && this.lastStart !== this.start) {
      this.total = this.total + (this.end - this.lastStart);
    }

    const hTotal = new Date(this.total);
    this.totalHuman = `${this.total < (60 * 60 * 1000) ? 0 : hTotal.getHours()}:${hTotal.getMinutes()}:${hTotal.getSeconds()}`;
  }

  @BeforeInsert()
  getHumanDate() {
    this.humanDate = new Date(this.start).toISOString().split('T')[0];
  }

}
