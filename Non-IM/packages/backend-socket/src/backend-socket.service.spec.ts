import { Test, TestingModule } from '@nestjs/testing';
import { BackendSocketService } from './backend-socket.service';

describe('BackendSocketService', () => {
  let service: BackendSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackendSocketService],
    }).compile();

    service = module.get<BackendSocketService>(BackendSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
