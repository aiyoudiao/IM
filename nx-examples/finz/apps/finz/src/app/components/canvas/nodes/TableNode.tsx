import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { PropertyViewModel, TableState } from '@finz/lib';
import { Table } from '../../../../packages/ui/organisms/table/Table';

export type TableNodeData = {
	name: string;
	propertyList: PropertyViewModel[];
	state: TableState;
};

export type TableNode = Node<TableNodeData, 'table-node'>;

export const TableNodeRenderer = ({ data, selected }: NodeProps<TableNode>) => {
	return (
		<div>
			<Table focused={selected ?? false} {...data} />

			<Handle type="source" position={Position.Top} />
			<Handle type="target" position={Position.Top} />

			<Handle type="source" position={Position.Left} />
			<Handle type="target" position={Position.Left} />

			<Handle type="source" position={Position.Right} />
			<Handle type="target" position={Position.Right} />

			<Handle type="source" position={Position.Bottom} />
			<Handle type="target" position={Position.Bottom} />
		</div>
	);
};
