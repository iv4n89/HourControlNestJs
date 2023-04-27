import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HourControlService } from './hour-control.service';

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

  @Post()
  start(@Body() { userId: id }: { userId: number }) {
    return this.hourControlService.startOrEnd(id);
  }

  @Post('by/date')
  getByDate(@Body() { userId: id, startDate, endDate = null }: { userId: number, startDate: string, endDate?: string }) {
    return this.hourControlService.getAllUserHourControlByDate(id, startDate, endDate);
  }
  
}
