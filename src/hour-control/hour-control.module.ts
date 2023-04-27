import { Module } from '@nestjs/common';
import { HourControlService } from './hour-control.service';
import { HourControlController } from './hour-control.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HourControl } from './entities/hour-control.entity';

@Module({
  controllers: [HourControlController],
  providers: [HourControlService],
  imports: [TypeOrmModule.forFeature([HourControl])],
})
export class HourControlModule {}
