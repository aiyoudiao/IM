import { PropertyViewModel, TableState } from '@finz/lib';
import { UUID } from 'crypto';

export const getStateStyles = (state: TableState, focused: boolean): string => {
	switch (state) {
		case 'added':
			return `bg-green-200 ${focused ? 'border-green-400' : 'border-green-200'}`;
		case 'removed':
			return `bg-red-200 ${focused ? 'border-red-400' : 'border-red-200'}`;
		case 'committed':
			return 'border-gray-200';
		default:
			return '';
	}
};

export const removeProperty = (
	propertyList: PropertyViewModel[],
	idToRemove: UUID,
	tableState: TableState,
): PropertyViewModel[] => {
	switch (tableState) {
		case 'added':
			return propertyList.filter((p) => p.id !== idToRemove);
		case 'committed':
			return propertyList.map((p) => ({ ...p, state: p.id === idToRemove ? 'removed' : p.state }));
		case 'removed':
			throw new Error('Cannot delete a property from a removed table.');
	}
};
