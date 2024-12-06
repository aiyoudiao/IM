const FieldError = ({ error }: { error?: string }) => {
	return error ? <p className="text-color-warning text-xs">{error}</p> : null;
};

export { FieldError };
