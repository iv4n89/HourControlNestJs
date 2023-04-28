import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Equal, Raw,
  Repository
} from 'typeorm';
import { HourControl } from './entities/hour-control.entity';

@Injectable()
export class HourControlService {
  constructor(
    @InjectRepository(HourControl)
    private readonly hourControlRepository: Repository<HourControl>,
  ) {}

  public async getAllByUser(userId: number) {
    return await this.hourControlRepository.find({
      where: { user: { id: userId } },
    });
  }

  public async getOne(id: number) {
    return await this.hourControlRepository.findOneOrFail({ where: { id } });
  }

  public async startOrEnd(userId: number) {
    let control: HourControl;

    if (
      await this.hourControlRepository.exist({
        where: { humanDate: Equal(new Date().toISOString().split('T')[0]) },
      })
    ) {
      control = await this.hourControlRepository.findOne({
        where: { humanDate: Equal(new Date().toISOString().split('T')[0]) },
      });
      if (control.ended) {
        control.lastStart = new Date().getTime();
        control.ended = 0;
        return this.hourControlRepository.save(control);
      }
      control.end = new Date().getTime();
      control.ended = 1;
      return this.hourControlRepository.save(control);
    } else {
      control = this.hourControlRepository.create({
        user: { id: userId },
        start: new Date().getTime(),
        lastStart: new Date().getTime(),
      });
      return this.hourControlRepository.save(control);
    }
  }

  public async getAllUserHourControlByDate(
    userId: number,
    startDate: string,
    endDate?: string,
  ) {
    const hourControls: HourControl[] = await this.hourControlRepository.find({
      where: {
        user: {
          id: userId,
        },
        start: Raw(
          (s) =>
            `${s} >= ${new Date(
              startDate + 'T00:00:00',
            ).getTime()} AND ${s} <= ${new Date(
              endDate + 'T23:59:59',
            ).getTime()}`,
        ),
      },
    });

    return hourControls;
  }

  private getTodayDate() {
    const today = new Date();
    const day: number = today.getDay();
    const month: number = today.getMonth();
    const year: number = today.getFullYear();
    const hour: number = today.getHours();
    const minutes: number = today.getMinutes();
    const seconds: number = today.getSeconds();
    const millisendsDate: number = today.getTime();

    return {
      day,
      month,
      year,
      hour,
      minutes,
      utcString: `${year}-${month}-${day}`,
      fullHour: `${hour}:${minutes}`,
      fullDate: `${year}-${month}-${day}T${hour}:${minutes}:${seconds}`,
      millisendsDate,
    };
  }

  private parseDateSub(date: string | number) {
    if (typeof date === 'number') {
      const d = new Date(date);
      date = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;
    } else {
      if (date.includes('T')) {
        date = date.split('T')[0];
      }
    }

    return new Date(date).getTime();
  }
}
