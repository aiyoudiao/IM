import { Test, TestingModule } from '@nestjs/testing';
import { BackendConstantsService } from './backend-constants.service';

describe('BackendConstantsService', () => {
  let service: BackendConstantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendConstantsService],
    }).compile();

    service = module.get<BackendConstantsService>(BackendConstantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
