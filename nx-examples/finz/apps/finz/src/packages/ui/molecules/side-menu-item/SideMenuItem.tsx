import { UUID } from 'crypto';
import { BodyRegular } from '../../atoms/typography/Typography';
import { EllipsisHorizontal } from '../../atoms/icon/Icons';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Button } from '../../atoms/button/Button';
import { Variant } from '../../shared/models';

interface SideMenuItemProps {
	id: UUID;
	name: string;
	actions: {
		name: string;
		onClick: (id: UUID) => void;
		variant?: Variant;
	}[];
}

const SideMenuItem = ({ id, name, actions }: SideMenuItemProps) => {
	return (
		<div className="flex w-ful items-center p-2 cursor-pointer hover:bg-teal-50 rounded">
			<BodyRegular className="grow">{name}</BodyRegular>
			<Menu>
				<MenuButton>
					<EllipsisHorizontal size="m" />
				</MenuButton>

				<MenuItems
					transition
					anchor="bottom end"
					className="min-w-[144px] rounded-lg border border-solid border-gray-200 p-1 bg-white shadow-sm"
				>
					{actions.map((action, index) => (
						<MenuItem key={index}>
							<Button
								variant={action.variant ?? 'text'}
								className="w-full text-left"
								onClick={() => action.onClick(id)}
							>
								{/* <PencilIcon className="size-4 fill-white/30" /> */}
								{action.name}
							</Button>
						</MenuItem>
					))}
				</MenuItems>
			</Menu>
		</div>
	);
};

export { SideMenuItem };
