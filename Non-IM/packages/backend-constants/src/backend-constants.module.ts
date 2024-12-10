import { Module } from '@nestjs/common';
import { BackendConstantsService } from './backend-constants.service';

@Module({
  providers: [BackendConstantsService],
  exports: [BackendConstantsService],
})
export class BackendConstantsModule {}
