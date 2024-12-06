import { Dialog as BaseDialog, DialogPanel } from '@headlessui/react';
import { BodyRegular, PageSubTitle } from '../../atoms/typography/Typography';
import { Size } from '../../shared/models';
import styles from './Dialog.module.css';
import { useContext } from 'react';
import { DialogContext } from './context';
import { DialogType } from './models';

interface DialogProps {
	name: string;
	title?: string;
	description?: string;
	children?: React.ReactNode;
	size?: Size;
	type?: DialogType;
	canccelButtonLabel?: string;
	actionButtonLabel?: string;
}

const Dialog = ({ name, title, description, children, size = 'm', type = 'info' }: DialogProps) => {
	const { isOpen, close } = useContext(DialogContext);

	const handleClose = () => {
		close(name);
	};

	return (
		<BaseDialog open={isOpen(name)} onClose={handleClose} className="relative z-50">
			<div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-700 bg-opacity-25">
				<DialogPanel className={`max-w-lg space-y-4 bg-white p-8 rounded-2xl ${styles[size]}`}>
					{title && <PageSubTitle className={styles[`title-${type}`]}>{title}</PageSubTitle>}
					{description && <BodyRegular>{description}</BodyRegular>}
					{children}
				</DialogPanel>
			</div>
		</BaseDialog>
	);
};

export { Dialog };
export type { DialogProps };
