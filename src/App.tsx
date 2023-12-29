import { UIProvider } from '@yamada-ui/react';
import { Contents } from './features/contents/Contents';

function App() {
  return (
    <UIProvider>
      <Contents />
    </UIProvider>
  );
}

export default App;
