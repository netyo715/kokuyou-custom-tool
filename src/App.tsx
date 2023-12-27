import { Tab, TabPanel, Tabs, UIProvider } from '@yamada-ui/react';
import { Settings } from './features/settings/Settings';
import { Contents } from './features/contents/Contents';

function App() {
  return (
    <UIProvider>
      <Contents />
    </UIProvider>
  );
}

export default App;
