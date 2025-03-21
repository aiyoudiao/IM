const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export function scheduleMicrotask(callback) {
    sleep(0).then(callback);
}
export function createNotifyManager() {
    let queue = [];
    let transactions = 0;
    let notifyFn = (callback) => {
        callback();
    };
    let batchNotifyFn = (callback) => {
        callback();
    };
    const flush = () => {
        const originalQueue = queue;
        queue = [];
        if (originalQueue.length) {
            scheduleMicrotask(() => {
                batchNotifyFn(() => {
                    originalQueue.forEach((callback) => {
                        notifyFn(callback);
                    });
                });
            });
        }
    };
    const batch = (callback) => {
        let result;
        transactions++;
        try {
            result = callback();
        }
        finally {
            transactions--;
            if (!transactions)
                flush();
        }
        return result;
    };
    const schedule = (callback) => {
        if (transactions) {
            queue.push(callback);
        }
        else {
            scheduleMicrotask(() => {
                notifyFn(callback);
            });
        }
    };
    /**
     * All calls to the wrapped function will be batched.
     */
    const batchCalls = (callback) => {
        return ((...args) => {
            schedule(() => {
                callback(...args);
            });
        });
    };
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    const setNotifyFunction = (fn) => {
        notifyFn = fn;
    };
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    const setBatchNotifyFunction = (fn) => {
        batchNotifyFn = fn;
    };
    return {
        batch,
        batchCalls,
        schedule,
        setNotifyFunction,
        setBatchNotifyFunction,
    };
}
// SINGLETON
export const scheduleManager = createNotifyManager();
//# sourceMappingURL=schedule.util.js.map