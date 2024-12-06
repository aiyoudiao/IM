export const TableStateList = ['added', 'removed', 'committed'] as const;
export type TableState = (typeof TableStateList)[number];

export const PropertyStateList = ['added', 'modified', 'removed', 'committed'] as const;
export type PropertyState = (typeof PropertyStateList)[number];
