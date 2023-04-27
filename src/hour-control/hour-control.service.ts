import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateHourControlDto } from './dto/create-hour-control.dto';
import { UpdateHourControlDto } from './dto/update-hour-control.dto';
import { HourControl } from './entities/hour-control.entity';

@Injectable()
export class HourControlService {
  constructor(
    @InjectRepository(HourControl)
    private readonly hourControlRepository: Repository<HourControl>,
  ) {}

  public async getAllByUser(userId: number) {
    return await this.hourControlRepository.find({ where: { user: { id: userId } } });
  }

  public async getOne(id: number) {
    return await this.hourControlRepository.findOneOrFail({ where: { id } });
  }

  public async start(userId: number) {
    const today = this.getTodayDate();

    if (
      await this.hourControlRepository.exist({
        where: { user: { id: userId }, startDate: Equal(today.utcString) },
      })
    ) {
      throw new Error('User has already started today');
    }

    const control: HourControl = this.hourControlRepository.create({
      user: { id: userId },
      startDate: today.utcString,
      startHour: today.fullHour,
    });

    return await this.hourControlRepository.save(control);
  }

  public async finish(userId: number) {
    const today = this.getTodayDate();
    const control: HourControl = await this.hourControlRepository.findOneOrFail({
      where: { user: { id: userId }, startDate: Equal(today.utcString) },
    });

    if (control.finish) {
      throw new Error('The user has already finished today');
    }

    control.finish = today.fullDate;
    return await this.hourControlRepository.save(control);
  }

  public async pause(userId: number) {
    const today = this.getTodayDate();

    const control: HourControl = await this.hourControlRepository.findOneOrFail({
      where: { user: { id: userId }, startDate: Equal(today.utcString) },
    });

    if (control.isPaused) {
      control.isPaused = 0;
      if (!control.pauseStart) {
        throw new Error('Pause had not been stored properly');
      }
      const pauseTime = today.millisendsDate - control.pauseStart;
      control.pause += pauseTime;
      control.pauseStart = 0;
    } else {
      control.isPaused = 1;
      control.pauseStart = today.millisendsDate;
    }

    return await this.hourControlRepository.save(control);
  }

  public async getAllUserHourControlByDate(
    userId: number,
    startDate: string,
    endDate: string
  ) {
    const sdt: number[] = startDate.split('-').map(Number);
    const edt: number[] = endDate.split('-').map(Number);

    const hourControls: HourControl[] = await this.hourControlRepository.find({
      where: {
        user: {
          id: userId,
        },
        startYear: MoreThan(sdt[0]) && LessThan(edt[0]),
        startMonth: MoreThan(sdt[1]) && LessThan(edt[1]),
        startDay: MoreThan(sdt[2]) && LessThan(edt[2]),
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
}
