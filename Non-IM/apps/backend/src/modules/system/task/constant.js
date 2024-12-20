export var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Disabled"] = 0] = "Disabled";
    TaskStatus[TaskStatus["Activited"] = 1] = "Activited";
})(TaskStatus || (TaskStatus = {}));
export var TaskType;
(function (TaskType) {
    TaskType[TaskType["Cron"] = 0] = "Cron";
    TaskType[TaskType["Interval"] = 1] = "Interval";
})(TaskType || (TaskType = {}));
export const SYS_TASK_QUEUE_NAME = 'system:sys-task';
export const SYS_TASK_QUEUE_PREFIX = 'system:sys:task';
//# sourceMappingURL=constant.js.map