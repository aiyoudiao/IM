import { Test, TestingModule } from '@nestjs/testing';
import { BackendCommonService } from './backend-common.service';

describe('BackendCommonService', () => {
  let service: BackendCommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendCommonService],
    }).compile();

    service = module.get<BackendCommonService>(BackendCommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
