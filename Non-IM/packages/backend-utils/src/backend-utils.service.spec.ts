import { Test, TestingModule } from '@nestjs/testing';
import { BackendUtilsService } from './backend-utils.service';

describe('BackendUtilsService', () => {
  let service: BackendUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendUtilsService],
    }).compile();

    service = module.get<BackendUtilsService>(BackendUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
