import { Test, TestingModule } from '@nestjs/testing';
import { HourControlController } from './hour-control.controller';
import { HourControlService } from './hour-control.service';

describe('HourControlController', () => {
  let controller: HourControlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HourControlController],
      providers: [HourControlService],
    }).compile();

    controller = module.get<HourControlController>(HourControlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
