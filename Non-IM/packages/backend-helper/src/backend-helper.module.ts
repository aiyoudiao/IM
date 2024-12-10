import { Module } from '@nestjs/common';
import { BackendHelperService } from './backend-helper.service';

@Module({
  providers: [BackendHelperService],
  exports: [BackendHelperService],
})
export class BackendHelperModule {}
