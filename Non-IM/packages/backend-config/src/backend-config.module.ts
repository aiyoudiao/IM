import { Module } from '@nestjs/common';
import { BackendConfigService } from './backend-config.service';

@Module({
  providers: [BackendConfigService],
  exports: [BackendConfigService],
})
export class BackendConfigModule {}
