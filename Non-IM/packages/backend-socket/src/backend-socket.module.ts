import { Module } from '@nestjs/common';
import { BackendSocketService } from './backend-socket.service';

@Module({
  providers: [BackendSocketService],
  exports: [BackendSocketService],
})
export class BackendSocketModule {}
