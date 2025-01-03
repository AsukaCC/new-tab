import { useState } from 'react';
import styles from './index.module.css';
import Menu from './components/menu';
import Avatar from './components/avatar';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && <div className={styles.wrapper} onClick={closeMenu}></div>}
      <div
        className={`${styles.navbarContainer} ${isOpen ? styles.isOpen : ''}`}>
        <div className={styles.avatarContainer} onClick={openMenu}>
          <Avatar />
        </div>
        {isOpen && (
          <div className={styles.menuContainer}>
            <Menu />
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
