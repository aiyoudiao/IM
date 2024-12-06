import { createContext, useState, useContext } from 'react';

interface DialogContextProps {
	isOpen: (name: string) => boolean;
	open: (name: string) => void;
	close: (name: string) => void;
}

export const DialogContext = createContext<DialogContextProps>({
	isOpen: () => false,
	open: () => undefined,
	close: () => undefined,
});

export const useDialog = (name: string) => {
	const context = useContext(DialogContext);

	context.close(name);

	return context;
};

export const DialogProvider = ({
	states = {},
	children,
}: {
	states?: Record<string, boolean>;
	children: React.ReactNode | React.ReactNode[];
}) => {
	const [dialogStates, setDialogStates] = useState<Record<string, boolean>>(states ?? []);

	const open = (name: string): void => {
		setDialogStates((prev) => ({ ...prev, [name]: true }));
	};

	const close = (name: string, onClose?: () => void): void => {
		setDialogStates((prev) => ({ ...prev, [name]: false }));
		onClose?.();
	};

	const isOpen = (name: string): boolean => {
		return dialogStates[name] ?? false;
	};

	const value = { isOpen, open, close };

	return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};
