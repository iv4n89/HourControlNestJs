import { PartialType } from '@nestjs/mapped-types';
import { CreateHourControlDto } from './create-hour-control.dto';

export class UpdateHourControlDto extends PartialType(CreateHourControlDto) {}
