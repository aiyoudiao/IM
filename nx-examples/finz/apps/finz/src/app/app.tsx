import { DialogProvider } from '../packages/ui/organisms/dialog/context';
import { MainContent } from './MainContent';

export function App() {
	return (
		<DialogProvider>
			<div>
				<MainContent />
			</div>
		</DialogProvider>
	);
}

export default App;
