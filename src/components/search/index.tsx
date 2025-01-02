import { useState, useRef } from 'react';
import styles from './index.module.css';
import Engines, { EnginesRef } from './components/engines';

const Search: React.FC = () => {
  const [searchContent, setSearchContent] = useState('');

  const enginesRef = useRef<EnginesRef>(null);

  const search = () => {
    if (enginesRef) {
      const query = encodeURIComponent(searchContent);
      window.open(
        `${enginesRef.current?.currentEngine.url.replace('{query}', query)}`
      );
    }
  };

  const inputContent = (value: string) => {
    setSearchContent(value);
  };

  return (
    <div className={styles.searchContainer}>
      <Engines ref={enginesRef} />
      <input
        className={styles.searchInput}
        type="text"
        placeholder="搜索..."
        value={searchContent}
        onChange={(e) => inputContent(e.target.value)}
      />
      <div className={styles.searchButton} onClick={search}>
        <svg className={`icon ${styles.searchIcon}`} aria-hidden="true">
          <use xlinkHref="#icon-sousuo"></use>
        </svg>
      </div>
    </div>
  );
};

export default Search;
