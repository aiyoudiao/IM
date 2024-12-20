import { HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
export class SocketException extends WsException {
    constructor(...args) {
        const error = args[0];
        if (typeof error === 'string') {
            super(HttpException.createBody({
                code: 0,
                message: error,
            }));
            this.errorCode = 0;
            return;
        }
        const [code, message] = error.split(':');
        super(HttpException.createBody({
            code,
            message,
        }));
        this.errorCode = Number(code);
    }
    getErrorCode() {
        return this.errorCode;
    }
}
//# sourceMappingURL=socket.exception.js.map