import { PageSubTitle } from '../packages/ui/atoms/typography/Typography';
import { SquareAdd } from '../packages/ui/atoms/icon/Icons';
import { IconButton } from '../packages/ui/atoms/button/IconButton';
import { useProjectDialog } from './components/project-dialog';
import { useProjects } from './hooks/useProjects';
import { SideMenuItem } from '../packages/ui/molecules/side-menu-item/SideMenuItem';
import { UUID } from 'crypto';
import { Skeleton } from '../packages/ui/atoms/skeleton/Skeleton';
import { Outlet } from 'react-router-dom';
import styles from './MainContent.module.css';

const MainContent = () => {
	const { isLoading: isProjectsRequestLoading, setShouldReload: setShouldReloadProjects, projects } = useProjects();
	const { ProjectDialog, openProjectDialog } = useProjectDialog(() => setShouldReloadProjects(true));

	const createProject = () => {
		openProjectDialog('create');
	};

	const renameProject = (id: UUID) => {
		openProjectDialog(
			'update',
			projects.items.find((i) => i.id === id),
		);
	};

	const deleteProject = (id: UUID) => {
		openProjectDialog(
			'delete',
			projects.items.find((i) => i.id === id),
		);
	};

	return (
		<div className="flex h-screen box-border">
			{/* left panel */}
			<div
				className={`w-[260px] flex flex-col divide-y divide-solid gap-y-2 border-r border-gray-300 ${styles.SideMenuShadow}`}
			>
				<div className="p-4 flex items-start justify-between">
					<PageSubTitle className="text-color-primary">Projects</PageSubTitle>
					<IconButton title="Create Project" variant="primary" size="l" onClick={createProject}>
						<SquareAdd />
					</IconButton>
				</div>
				<div className="flex flex-col p-4">
					{isProjectsRequestLoading ? (
						<Skeleton />
					) : (
						projects.items.map((project, index) => (
							<SideMenuItem
								key={index}
								id={project.id}
								name={project.name}
								actions={[
									{
										name: 'Rename',
										onClick: renameProject,
									},
									{
										name: 'Delete',
										onClick: deleteProject,
										variant: 'warn',
									},
								]}
							/>
						))
					)}
				</div>
			</div>

			{/* main area */}
			<div className="flex-1 flex flex-col">
				<Outlet />
			</div>

			{/* dialog */}
			<ProjectDialog />
		</div>
	);
};

export { MainContent };
