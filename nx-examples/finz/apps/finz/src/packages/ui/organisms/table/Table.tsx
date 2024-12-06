import { useEffect, useRef, useState } from 'react';
import { Property } from '../../atoms/property/Property';
import { SectionTitle } from '../../atoms/typography/Typography';
import styles from './Table.module.css';
import { getStateStyles, removeProperty } from './helpers';
import { InlineInput } from '../../molecules/input/InlineInput';
import { TableViewModel } from '@finz/lib';
import { ENTER_KEY } from '../../../shared/constant';
import { getNewGuid } from '@finz/lib';
import { UUID } from 'crypto';

interface TableViewProps extends TableViewModel {
	focused: boolean;
}

const Table = ({ name, propertyList, state, focused }: TableViewProps) => {
	const [table, setTable] = useState<TableViewModel>({ name, propertyList, state });
	const [selectedPropertyId, setSelectedPropertyId] = useState<UUID | undefined>();
	const [nameInEdit, setNameInEdit] = useState<boolean>(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const newPropertyRef = useRef<HTMLInputElement>(null);

	const editTableName = () => {
		setNameInEdit(true);
	};

	useEffect(() => {
		setNameInEdit(focused && nameInEdit);
		if (!focused) {
			setSelectedPropertyId(undefined);
		}
	}, [focused]);

	const updateTableName = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === ENTER_KEY && nameRef.current && nameRef.current.value.length > 0) {
			setTable({ ...table, name: nameRef.current.value });
			setNameInEdit(false);
		}
	};

	const updateProperties = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === ENTER_KEY && newPropertyRef.current && newPropertyRef.current.value.length > 0) {
			setTable({
				...table,
				propertyList: [...table.propertyList, { id: getNewGuid(), name: newPropertyRef.current.value, state: 'added' }],
			});
			newPropertyRef.current.value = '';
		}
	};

	const onPropertySelected = (id: UUID) => setSelectedPropertyId(id);
	const onPropertyDeleted = (id: UUID) =>
		setTable({ ...table, propertyList: removeProperty(table.propertyList, id, state) });

	const onNewPropertyInputFocused = (): void => setSelectedPropertyId(undefined);

	const updatePropertyName = (id: UUID, newName: string): void => {
		const index = table.propertyList.findIndex((p) => p.id === id);
		setTable({
			...table,
			propertyList: [
				...table.propertyList.slice(0, index),
				{ ...table.propertyList[index], name: newName },
				...table.propertyList.slice(index + 1),
			],
		});
	};

	const moveUpProperty = (id: UUID): void => {
		const index = table.propertyList.findIndex((p) => p.id === id);
		if (index === 0) {
			return;
		}

		setTable({
			...table,
			propertyList: [
				...table.propertyList.slice(0, index - 1),
				table.propertyList[index],
				table.propertyList[index - 1],
				...table.propertyList.slice(index + 1),
			],
		});
	};

	const moveDownProperty = (id: UUID): void => {
		const index = table.propertyList.findIndex((p) => p.id === id);
		if (index === table.propertyList.length - 1) {
			return;
		}

		setTable({
			...table,
			propertyList: [
				...table.propertyList.slice(0, index),
				table.propertyList[index + 1],
				table.propertyList[index],
				...table.propertyList.slice(index + 2),
			],
		});
	};

	return (
		<div className={`${styles.table} ${getStateStyles(table.state, focused)}`}>
			<div className="px-2 py-1 text-center">
				{!nameInEdit || table.state === 'removed' ? (
					<SectionTitle onDoubleClick={editTableName}>{table.name}</SectionTitle>
				) : (
					<InlineInput ref={nameRef} name="name" defaultValue={table.name} onKeyUp={updateTableName} />
				)}
			</div>
			{table.propertyList.map((propertyProps, index) => (
				<Property
					key={index}
					{...propertyProps}
					className={
						table.propertyList.length === index + 1 && (!focused || table.state === 'removed') ? 'rounded-b-lg' : ''
					}
					selected={selectedPropertyId === propertyProps.id}
					onSelect={(id) => onPropertySelected(id)}
					onDelete={(id) => onPropertyDeleted(id)}
					onPropertyNameUpdated={(id, newName) => updatePropertyName(id, newName)}
					onPropertyMoveUp={(id) => moveUpProperty(id)}
					onPropertyMoveDown={(id) => moveDownProperty(id)}
				/>
			))}
			{focused && !nameInEdit && table.state !== 'removed' && (
				<div className="p-2">
					<InlineInput
						name="newProperty"
						ref={newPropertyRef}
						onKeyUp={updateProperties}
						onFocus={onNewPropertyInputFocused}
					/>
				</div>
			)}
		</div>
	);
};

export { Table };
