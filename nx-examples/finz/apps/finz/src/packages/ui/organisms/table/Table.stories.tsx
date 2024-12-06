import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import { getNewGuid, TableState, TableStateList } from '@finz/lib';

const meta: Meta<typeof Table> = {
	component: Table,
	argTypes: {
		state: {
			options: TableStateList as readonly TableState[],
			control: { type: 'select' },
		},
		focused: {
			control: { type: 'boolean' },
		},
	},
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
	args: {
		name: 'Table 1',
		state: 'committed',
		propertyList: [
			{ id: getNewGuid(), name: 'Property 1', state: 'committed' },
			{ id: getNewGuid(), name: 'Property 2', state: 'added' },
		],
		focused: false,
	},
};
