import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { HourControlService } from './hour-control.service';
import { CreateHourControlDto } from './dto/create-hour-control.dto';
import { UpdateHourControlDto } from './dto/update-hour-control.dto';

@Controller('hour-control')
export class HourControlController {
  constructor(private readonly hourControlService: HourControlService) {}

  @Get('by/user/:id')
  getAllByUser(@Param('id', ParseIntPipe) id: number) {
    return this.hourControlService.getAllByUser(id);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.hourControlService.getOne(id);
  }

  @Post('start/user')
  start(@Body() { userId: id }: { userId: number }) {
    return this.hourControlService.start(id);
  }

  @Post('pause/user')
  pause(@Body() { userId: id }: { userId: number }) {
    return this.hourControlService.pause(id);
  }

  @Post('finish/user')
  finish(@Body() { userId: id }: { userId: number }) {
    return this.hourControlService.finish(id);
  }

  @Post('by/date')
  getByDate(@Body() { userId: id, startDate, endDate }: { userId: number, startDate: string, endDate: string }) {
    return this.hourControlService.getAllUserHourControlByDate(id, startDate, endDate);
  }
  
}
