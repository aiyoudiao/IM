import type { NodeTypes } from '@xyflow/react';
import { TableNode, TableNodeRenderer } from './TableNode';
import { v4 as uuidv4 } from 'uuid';

const DefaultNode: TableNode = {
	id: uuidv4(),
	type: 'table-node',
	position: { x: 0, y: 0 },
	data: {
		name: 'table',
		propertyList: [],
		state: 'added',
	},
};

export const InitializeNewNode = () => ({
	...DefaultNode,
	id: uuidv4(),
	position: { x: 10, y: 10 },
});

export const initialNodes: TableNode[] = [DefaultNode];

export const nodeTypes = {
	'table-node': TableNodeRenderer,
	// Add any of your custom nodes here!
} satisfies NodeTypes;
