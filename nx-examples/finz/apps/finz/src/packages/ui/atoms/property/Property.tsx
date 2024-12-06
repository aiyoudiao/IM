import { PropertyState, PropertyViewModel } from '@finz/lib';
import { BodyRegular } from '../typography/Typography';
import { UUID } from 'crypto';
import { IconButton } from '../button/IconButton';
import { Down, Remove, Up } from '../icon/Icons';
import { ENTER_KEY } from '../../../shared/constant';
import { useEffect, useRef, useState } from 'react';
import { InlineInput } from '../../molecules/input/InlineInput';

export interface PropertyProps extends PropertyViewModel {
	selected: boolean;
	className?: string;
	onSelect: (id: UUID) => void;
	onDelete: (id: UUID) => void;
	onPropertyNameUpdated: (id: UUID, newName: string) => void;
	onPropertyMoveUp: (id: UUID) => void;
	onPropertyMoveDown: (id: UUID) => void;
}

const Property = ({
	id,
	name,
	state,
	className,
	selected,
	onSelect,
	onDelete,
	onPropertyNameUpdated,
	onPropertyMoveUp,
	onPropertyMoveDown,
}: PropertyProps) => {
	const [inEdit, setInEdit] = useState(false);
	const [tabIndex, setTabeIndex] = useState(0);
	const propertyRef = useRef<HTMLInputElement>(null);

	const getStateColor = (state: PropertyState, selected: boolean): string => {
		switch (state) {
			case 'added':
				return selected ? 'bg-green-400' : 'bg-green-200';
			case 'removed':
				return selected ? 'bg-red-400' : 'bg-red-200';
			case 'modified':
				return 'bg-purple-200';
			default:
				return '';
		}
	};

	const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>): void => {
		if (!selected) {
			return;
		}

		if (event.key === ENTER_KEY && !inEdit) {
			setInEdit(true);
		}
	};

	const onPropertyNameFieldKeyUp = (event: React.KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === ENTER_KEY) {
			onPropertyNameUpdated(id, propertyRef.current?.value as string);
			setInEdit(false);
		}
	};

	useEffect(() => {
		setTabeIndex(selected && !inEdit ? 0 : -1);
		if (inEdit && propertyRef.current) {
			propertyRef.current.focus();
			propertyRef.current.value = name;
		}
	}, [selected, inEdit, name]);

	return (
		<div
			className={`px-2 py-1 ${getStateColor(state, selected)} ${className} flex gap-0.5`}
			tabIndex={tabIndex}
			onClick={() => onSelect(id)}
			onKeyUp={handleKeyUp}
		>
			{selected && !inEdit && (
				<div className="flex items-center">
					<IconButton title={`Delete ${name}`} variant="alert" size="s" onClick={() => onDelete(id)}>
						<Remove />
					</IconButton>
					<div className="flex flex-col">
						<IconButton title="Move Up" size="xs" onClick={() => onPropertyMoveUp(id)}>
							<Up />
						</IconButton>
						<IconButton title="Move Up" size="xs" onClick={() => onPropertyMoveDown(id)}>
							<Down />
						</IconButton>
					</div>
				</div>
			)}
			{inEdit ? (
				<div className="p-2">
					<InlineInput name="propertyName" ref={propertyRef} onKeyUp={onPropertyNameFieldKeyUp} />
				</div>
			) : (
				<BodyRegular>{name}</BodyRegular>
			)}
		</div>
	);
};

export { Property };
