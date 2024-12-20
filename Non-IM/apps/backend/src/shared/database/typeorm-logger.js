import { Logger } from '@nestjs/common';
export class TypeORMLogger {
    constructor(options) {
        this.options = options;
        this.logger = new Logger(TypeORMLogger.name);
    }
    logQuery(query, parameters, _queryRunner) {
        if (!this.isEnable('query'))
            return;
        const sql = query
            + (parameters && parameters.length
                ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
                : '');
        this.logger.log(`[QUERY]: ${sql}`);
    }
    logQueryError(error, query, parameters, _queryRunner) {
        if (!this.isEnable('error'))
            return;
        const sql = query
            + (parameters && parameters.length
                ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
                : '');
        this.logger.error([`[FAILED QUERY]: ${sql}`, `[QUERY ERROR]: ${error}`]);
    }
    logQuerySlow(time, query, parameters, _queryRunner) {
        const sql = query
            + (parameters && parameters.length
                ? ` -- PARAMETERS: ${this.stringifyParams(parameters)}`
                : '');
        this.logger.warn(`[SLOW QUERY: ${time} ms]: ${sql}`);
    }
    logSchemaBuild(message, _queryRunner) {
        if (!this.isEnable('schema'))
            return;
        this.logger.log(message);
    }
    logMigration(message, _queryRunner) {
        if (!this.isEnable('migration'))
            return;
        this.logger.log(message);
    }
    log(level, message, _queryRunner) {
        if (!this.isEnable(level))
            return;
        switch (level) {
            case 'log':
                this.logger.debug(message);
                break;
            case 'info':
                this.logger.log(message);
                break;
            case 'warn':
                this.logger.warn(message);
                break;
            default:
                break;
        }
    }
    /**
     * Converts parameters to a string.
     * Sometimes parameters can have circular objects and therefor we are handle this case too.
     */
    stringifyParams(parameters) {
        try {
            return JSON.stringify(parameters);
        }
        catch (error) {
            // most probably circular objects in parameters
            return parameters;
        }
    }
    /**
     * check enbale log
     */
    isEnable(level) {
        return (this.options === 'all'
            || this.options === true
            || (Array.isArray(this.options) && this.options.includes(level)));
    }
}
//# sourceMappingURL=typeorm-logger.js.map