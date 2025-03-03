import { useSelector } from 'react-redux';
import './App.css';
import NavBar from './components/navbar';
import CardContent from './components/cardContent';
import Search from './components/search';
import { RootState } from './redux';
import { useCallback, useRef } from 'react';
import ContextMenu from './components/contextMenu';
import WebsiteBar from './components/websiteBar';
const App: React.FC = () => {
  const standerMode = useSelector(
    (state: RootState) => state.config.isStandardModel
  );
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    if (contextMenuRef.current) {
      contextMenuRef.current.style.display = 'block';
      contextMenuRef.current.style.left = `${event.clientX}px`;
      contextMenuRef.current.style.top = `${event.clientY}px`;
    }
  }, []);

  return (
    <>
      <ContextMenu ref={contextMenuRef} />
      <div className="page" onContextMenu={handleContextMenu}>
        <NavBar />
        <WebsiteBar />
        <div className="content">
          <Search />
          {standerMode && (
            <div className="cardContent">
              <CardContent />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
