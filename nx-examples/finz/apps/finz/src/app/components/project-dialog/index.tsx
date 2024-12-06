import { useForm } from 'react-hook-form';
import { Input } from '../../../packages/ui/molecules/input/Input';
import { Button } from '../../../packages/ui/atoms/button/Button';
import { Dialog } from '../../../packages/ui/organisms/dialog/Dialog';
import { useContext, useState } from 'react';
import { DialogContext } from '../../../packages/ui/organisms/dialog/context';
import { callPost, callPatch, callDelete } from '../../../packages/shared/httpUtil';
import { ActionType, ProjectListItem } from '@finz/lib';
import { BodyBold } from '../../../packages/ui/atoms/typography/Typography';

interface FormData {
	name: string;
}

export const useProjectDialog = (onSubmissionSuccessful: () => void) => {
	const dialogName = 'create-project';
	const { open, close, isOpen } = useContext(DialogContext);
	const [projectInEdit, setProjectInEdit] = useState<ProjectListItem>();
	const [actionType, setActionType] = useState<ActionType>('create');

	const openProjectDialog = (actionType: ActionType, projectInEdit?: ProjectListItem) => {
		setProjectInEdit(projectInEdit);
		setActionType(actionType);
		open(dialogName);
	};

	const closeProjectDialog = () => {
		close(dialogName);
		setProjectInEdit(undefined);
		setActionType('create');
	};

	const isProjectDialogOpen = isOpen(dialogName);

	const ProjectDialog = () => {
		const dialogType = actionType === 'delete' ? 'warning' : 'info';
		const title =
			actionType === 'create' ? 'Create Project' : actionType === 'update' ? 'Rename Project' : 'Delete Project';
		const { close } = useContext(DialogContext);

		const handleClose = () => {
			close(dialogName);
		};

		const ProjectForm = () => {
			const {
				register,
				handleSubmit,
				formState: { errors },
			} = useForm<FormData>({
				defaultValues: {
					name: projectInEdit?.name,
				},
			});

			const onSubmit = async (data: FormData): Promise<void> => {
				try {
					if (actionType === 'create') {
						await callPost<{ name: string }>('/projects', { name: data.name });
					} else if (actionType === 'update') {
						if (!projectInEdit?.id) {
							throw new Error('ID is required for project update.');
						}
						await callPatch<{ name: string }>(`/projects/${projectInEdit?.id}`, { name: data.name });
					}
					close(dialogName);
					onSubmissionSuccessful();
				} catch (error) {
					console.error('Error creating project:', error);
				}
			};

			return (
				<form onSubmit={handleSubmit(onSubmit)} className="form-layout">
					<Input
						label="Project Name"
						placeholder="Enter project name"
						{...register('name', { required: 'Project name is required' })}
						error={errors.name?.message}
					/>
					<div className="flex gap-4 justify-end">
						<Button type="button" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="primary" type="submit">
							Create
						</Button>
					</div>
				</form>
			);
		};

		const deleteProject = async () => {
			try {
				await callDelete(`/projects/${projectInEdit?.id}`);
				close(dialogName);
				onSubmissionSuccessful();
			} catch (error) {
				console.error('Error creating project:', error);
			}
		};

		return (
			<Dialog size={'l'} name={dialogName} type={dialogType} title={title}>
				{actionType !== 'delete' ? (
					<ProjectForm />
				) : (
					<>
						<BodyBold>
							Deleting project will result in losing all the tables. This is not revertable. Are you sure that you want
							to delete this project?
						</BodyBold>
						<div className="flex gap-4 justify-end">
							<Button type="button" onClick={handleClose}>
								Cancel
							</Button>
							<Button variant="alert" onClick={deleteProject}>
								Delete
							</Button>
						</div>
					</>
				)}
			</Dialog>
		);
	};

	return { ProjectDialog, openProjectDialog, closeProjectDialog, isProjectDialogOpen };
};
