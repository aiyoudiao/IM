import { ProjectViewModel } from '@finz/lib';
import { useEffect, useState } from 'react';
import { callGet } from '../../packages/shared/httpUtil';
import { UUID } from 'crypto';

const useProject = (id: UUID) => {
	const [isLoading, setIsLoading] = useState(true);
	const [project, setProject] = useState<ProjectViewModel>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const result = await callGet<ProjectViewModel>(`/projects/${id}`);
				setProject(result);
			} catch (error) {
				console.error('Error loading projects:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [id]);

	return { isLoading, project };
};

export { useProject };
