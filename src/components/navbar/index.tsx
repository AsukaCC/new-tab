import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Menu from './components/menu';
import Avatar from './components/avatar';
import ThemeButton from '../themeButton';

import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '@/redux/slice/configSlice';
import { RootState } from '@/redux';
import { setUser, setNull } from '@/redux/slice/userSlice';
import { setIsOpening } from '@/redux/slice/stateSlice';

const NavBar: React.FC = () => {
  const config = useSelector((state: RootState) => state.config);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const isOpening = useSelector((state: RootState) => state.state.isOpening);

  //获取当前系统主题
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const initTheme = () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const localTheme = config.theme || systemTheme;
    document.documentElement.setAttribute('data-theme', localTheme);
    setIsDarkMode(localTheme == 'dark');
    dispatch(setTheme(localTheme));
  };

  const changeTheme = () => {
    const newIsDarkMode = !isDarkMode;
    const themeMode = newIsDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeMode);
    setIsDarkMode(newIsDarkMode);
    dispatch(setTheme(themeMode));
  };

  const openMenu = () => {
    dispatch(setIsOpening(true));
  };

  const closeMenu = () => {
    dispatch(setIsOpening(false));
  };

  useEffect(() => {
    initTheme();
  }, []);

  const userLogin = async () => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        console.error('获取令牌失败:', chrome.runtime.lastError);
        return;
      }
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: new Headers({ Authorization: 'Bearer ' + token }),
      })
        .then((response) => response.json())
        .then((userInfo) => {
          console.log('用户信息:', userInfo);
          dispatch(setUser(userInfo));
        })
        .catch((error) => {
          console.error('获取用户信息失败:', error);
        });
    });
  };

  const userLogout = async () => {
    chrome.identity.clearAllCachedAuthTokens(() => {
      console.log('所有缓存的身份验证令牌已被清除');
      dispatch(setNull());
    });
  };

  return (
    <>
      {isOpening && <div className={styles.wrapper} onClick={closeMenu}></div>}
      <div
        className={`${styles.navbarContainer} ${
          isOpening ? styles.isOpen : ''
        }`}>
        <div
          className={`${styles.userContainer} ${
            isOpening ? styles.isOpen : ''
          }`}>
          {/* 登录按钮 */}
          <div
            className={styles.button}
            onClick={user.sub ? userLogout : userLogin}>
            <span> {user.sub ? '退出登录' : '立即登录'}</span>
          </div>
          {/* 主题按钮 */}
          <div
            className={`${styles.themeContainer} ${
              isOpening ? styles.isOpen : ''
            }`}>
            <ThemeButton isDarkMode={isDarkMode} onChange={changeTheme} />
          </div>
          {/* 头像 */}
          <div className={styles.avatarContainer}>
            {isOpening ? (
              <div className={styles.closeButton} onClick={closeMenu}>
                <svg className={`icon ${styles.closeIcon}`} aria-hidden="true">
                  <use xlinkHref="#icon-guanbi"></use>
                </svg>
              </div>
            ) : (
              <div onClick={openMenu} className={styles.avatar}>
                {user.picture ? (
                  <Avatar src={user.picture} />
                ) : (
                  <svg
                    className={`icon ${styles.avatarIcon}`}
                    aria-hidden="true">
                    <use xlinkHref="#icon-geren"></use>
                  </svg>
                )}
              </div>
            )}
          </div>
        </div>
        {isOpening && (
          <div className={styles.menuContainer}>
            <Menu />
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
