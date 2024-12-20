export function catchError() {
    process.on('unhandledRejection', (reason, p) => {
        console.log('Promise: ', p, 'Reason: ', reason);
    });
}
//# sourceMappingURL=catchError.js.map