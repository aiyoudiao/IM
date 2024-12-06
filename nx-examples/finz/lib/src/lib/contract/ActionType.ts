export const ActionTypeList = ['create', 'update', 'delete'] as const;
export type ActionType = (typeof ActionTypeList)[number];