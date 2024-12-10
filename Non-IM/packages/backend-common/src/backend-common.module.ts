import { Module } from '@nestjs/common';
import { BackendCommonService } from './backend-common.service';

@Module({
  providers: [BackendCommonService],
  exports: [BackendCommonService],
})
export class BackendCommonModule {}
