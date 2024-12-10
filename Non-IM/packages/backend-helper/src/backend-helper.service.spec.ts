import { Test, TestingModule } from '@nestjs/testing';
import { BackendHelperService } from './backend-helper.service';

describe('BackendHelperService', () => {
  let service: BackendHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendHelperService],
    }).compile();

    service = module.get<BackendHelperService>(BackendHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
