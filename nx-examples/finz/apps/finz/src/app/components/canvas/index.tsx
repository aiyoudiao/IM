import { useParams } from 'react-router-dom';
import { ReactFlow, useNodesState, useEdgesState, addEdge, Connection, Background } from '@xyflow/react';
import { useCallback } from 'react';
import { InitializeNewNode, initialNodes, nodeTypes } from './nodes';
import '@xyflow/react/dist/style.css';
import { Button } from '../../../packages/ui/atoms/button/Button';
import { Input } from '../../../packages/ui/molecules/input/Input';
import { useForm } from 'react-hook-form';

interface CommitFormData {
	message: string;
}

const Canvas = () => {
	const { projectId } = useParams();

	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

	const addNewTable = () => {
		setNodes([...nodes, InitializeNewNode()]);
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CommitFormData>({
		defaultValues: {
			message: '',
		},
	});

	const onSubmit = (data: CommitFormData) => {
		console.debug(data);
	};

	return (
		<>
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<Background />
			</ReactFlow>
			<div className="p-4 h-[260px] border-t border-gray-300 flex flex-col justify-between">
				<div className="flex">
					<Button variant="primary" onClick={addNewTable}>
						New Table
					</Button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="inline-form-layout">
					<Input
						placeholder="Commit Message"
						{...register('message', { required: 'Project name is required' })}
						error={errors.message?.message}
					/>
					<Button variant="primary" size="m" type="submit">
						Commit
					</Button>
				</form>
			</div>
		</>
	);
};

export { Canvas };
