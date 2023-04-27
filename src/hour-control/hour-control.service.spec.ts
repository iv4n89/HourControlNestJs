import { Test, TestingModule } from '@nestjs/testing';
import { HourControlService } from './hour-control.service';

describe('HourControlService', () => {
  let service: HourControlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HourControlService],
    }).compile();

    service = module.get<HourControlService>(HourControlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
