const BASE_URL = 'http://localhost:3000/api';

export const callGet = async <T>(url: string): Promise<T> => {
	const response = await fetch(`${BASE_URL}${url}`);
	return response.json() as Promise<T>;
};

export const callPost = async <T>(url: string, data: T): Promise<T> => {
	const response = await fetch(`${BASE_URL}${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json() as Promise<T>;
};

export const callPatch = async <T>(url: string, data: T): Promise<T> => {
	const response = await fetch(`${BASE_URL}${url}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	return response.json() as Promise<T>;
};

export const callDelete = async (url: string): Promise<unknown> => {
	return fetch(`${BASE_URL}${url}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
