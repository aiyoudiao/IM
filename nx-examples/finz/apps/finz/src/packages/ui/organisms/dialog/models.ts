export const DialogTypeList = ['info', 'warning', 'error', 'success'] as const;
export type DialogType = (typeof DialogTypeList)[number];
