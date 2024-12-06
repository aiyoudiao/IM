import { ListViewModel, ProjectListItem } from '@finz/lib';
import { useEffect, useState } from 'react';
import { callGet } from '../../packages/shared/httpUtil';

const useProjects = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [shouldReload, setShouldReload] = useState(true);
	const [projects, setProjects] = useState<ListViewModel<ProjectListItem>>({
		items: [],
		total: 0,
		limit: 10,
		page: 0,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await callGet<ListViewModel<ProjectListItem>>('/projects');
				setProjects(result);
			} catch (error) {
				console.error('Error loading projects:', error);
			} finally {
				setIsLoading(false);
				setShouldReload(false);
			}
		};

		if (shouldReload) {
			fetchData();
		}
	}, [shouldReload]);

	return { isLoading, setShouldReload, projects };
};

export { useProjects };
