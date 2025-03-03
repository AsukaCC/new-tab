import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/index.ts';
import '@/utils/iconfont.js';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* 使用 PersistGate 来包裹你的应用，等待恢复状态 */}
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
