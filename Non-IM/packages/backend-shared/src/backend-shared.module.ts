import { Module } from '@nestjs/common';
import { BackendSharedService } from './backend-shared.service';

@Module({
  providers: [BackendSharedService],
  exports: [BackendSharedService],
})
export class BackendSharedModule {}
