import styles from './App.module.css';
import NavBar from './components/navbar';
import Search from './components/search';

const App: React.FC = () => {
  return (
    <>
      <div className={styles.page}>
        <NavBar />
        <div className={styles.content}>
          <Search />
        </div>
      </div>
    </>
  );
};

export default App;
