import { Provider } from 'react-redux';
import './App.css';
import NavBar from './components/navbar';
import CardContent from './components/cardContent';
import Search from './components/search';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux';
import { useEffect } from 'react';
import logSting from '@/utils/logSting';

const App: React.FC = () => {
  useEffect(() => {
    console.log(logSting);
  })
  return (
    <>
      <Provider store={store}>
        {/* 使用 PersistGate 来包裹你的应用，等待恢复状态 */}
        <PersistGate loading={null} persistor={persistor}>
          <div className="page">
            <NavBar />
            <div className="content">
              <Search />
              <CardContent />
            </div>
          </div>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
