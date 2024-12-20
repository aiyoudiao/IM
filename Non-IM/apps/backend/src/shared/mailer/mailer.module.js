import { __decorate } from "tslib";
import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerService } from './mailer.service';
const providers = [
    MailerService,
];
let MailerModule = class MailerModule {
};
MailerModule = __decorate([
    Module({
        imports: [
            NestMailerModule.forRootAsync({
                imports: [ConfigModule],
                useFactory: (configService) => ({
                    transport: configService.get('mailer'),
                    defaults: {
                        from: {
                            name: configService.get('app').name,
                            address: configService.get('mailer').auth.user,
                        },
                    },
                    template: {
                        dir: join(__dirname, '..', '..', '/assets/templates'),
                        adapter: new HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [ConfigService],
            }),
        ],
        providers,
        exports: providers,
    })
], MailerModule);
export { MailerModule };
//# sourceMappingURL=mailer.module.js.map