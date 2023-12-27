import './App.css';
import { Stack, Tab, TabPanel, Tabs, UIProvider } from '@yamada-ui/react';
import { Settings } from './features/Settings/Settings';

function App() {
  return (
    <UIProvider>
      <main>
        <Tabs defaultIndex={localStorage.getItem("dataURL") ? 0 : 2}>
          <Tab>対戦履歴</Tab>
          <Tab>レーティング</Tab>
          <Tab>設定</Tab>
          <TabPanel></TabPanel>
          <TabPanel></TabPanel>
          <TabPanel>
            <Settings/>
          </TabPanel>
        </Tabs>
      </main>
    </UIProvider>
  );
}

export default App;
