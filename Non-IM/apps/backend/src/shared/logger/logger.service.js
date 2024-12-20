import { __decorate, __metadata } from "tslib";
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
export var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["DEBUG"] = "debug";
    LogLevel["VERBOSE"] = "verbose";
})(LogLevel || (LogLevel = {}));
let LoggerService = class LoggerService extends ConsoleLogger {
    constructor(context, options, configService) {
        super(context, options);
        this.configService = configService;
        this.initWinston();
    }
    get level() {
        return this.configService.get('app.logger.level', { infer: true });
    }
    get maxFiles() {
        return this.configService.get('app.logger.maxFiles', { infer: true });
    }
    initWinston() {
        this.winstonLogger = createLogger({
            levels: config.npm.levels,
            format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
            transports: [
                new transports.DailyRotateFile({
                    level: this.level,
                    filename: 'logs/app.%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: this.maxFiles,
                    format: format.combine(format.timestamp(), format.json()),
                    auditFile: 'logs/.audit/app.json',
                }),
                new transports.DailyRotateFile({
                    level: LogLevel.ERROR,
                    filename: 'logs/app-error.%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: this.maxFiles,
                    format: format.combine(format.timestamp(), format.json()),
                    auditFile: 'logs/.audit/app-error.json',
                }),
            ],
        });
        // if (isDev) {
        //   this.winstonLogger.add(
        //     new transports.Console({
        //       level: this.level,
        //       format: format.combine(
        //         format.simple(),
        //         format.colorize({ all: true }),
        //       ),
        //     }),
        //   );
        // }
    }
    verbose(message, context) {
        super.verbose.apply(this, [message, context]);
        this.winstonLogger.log(LogLevel.VERBOSE, message, { context });
    }
    debug(message, context) {
        super.debug.apply(this, [message, context]);
        this.winstonLogger.log(LogLevel.DEBUG, message, { context });
    }
    log(message, context) {
        super.log.apply(this, [message, context]);
        this.winstonLogger.log(LogLevel.INFO, message, { context });
    }
    warn(message, context) {
        super.warn.apply(this, [message, context]);
        this.winstonLogger.log(LogLevel.WARN, message);
    }
    error(message, stack, context) {
        super.error.apply(this, [message, stack, context]);
        const hasStack = !!context;
        this.winstonLogger.log(LogLevel.ERROR, {
            context: hasStack ? context : stack,
            message: hasStack ? new Error(message) : message,
        });
    }
};
LoggerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [String, Object, ConfigService])
], LoggerService);
export { LoggerService };
//# sourceMappingURL=logger.service.js.map