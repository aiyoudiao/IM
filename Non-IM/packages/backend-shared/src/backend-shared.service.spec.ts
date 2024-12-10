import { Test, TestingModule } from '@nestjs/testing';
import { BackendSharedService } from './backend-shared.service';

describe('BackendSharedService', () => {
  let service: BackendSharedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendSharedService],
    }).compile();

    service = module.get<BackendSharedService>(BackendSharedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
