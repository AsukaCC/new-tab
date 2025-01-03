import { useState, forwardRef, useImperativeHandle } from 'react';
import { Website } from '@/types';
import styles from './index.module.css';

export interface EnginesRef {
  currentEngine: Website;
}

const Engines = forwardRef<EnginesRef>((_, ref) => {
  const initialEngines: Website[] = [
    {
      name: 'Google',
      url: 'https://www.google.com/search?q={query}',
      favicon: 'https://www.google.com/favicon.ico',
    },
    {
      name: 'Bing',
      url: 'https://www.bing.com/search?q={query}',
      favicon: 'https://www.bing.com/favicon.ico',
    },
    {
      name: '百度',
      url: 'https://www.baidu.com/s?wd={query}',
      favicon: 'https://www.baidu.com/favicon.ico',
    },
  ];

  const [currentEngine, setCurrentEngine] = useState<Website>(
    initialEngines[0]
  );
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // 暴露给父组件的 ref
  useImperativeHandle(ref, () => ({
    currentEngine,
  }));

  // 切换引擎
  const handleEngineChange = (engine: Website) => {
    setCurrentEngine(engine);
    setIsMenuVisible(false); // 切换后自动关闭菜单
  };

  // 切换菜单显示状态
  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  // 关闭菜单
  const closeMenu = () => {
    setIsMenuVisible(false);
  };

  return (
    <div className={styles.enginesContainer}>
      {/* 当前引擎 */}
      <div className={styles.currentEngine} onClick={toggleMenu}>
        <img src={currentEngine.favicon}></img>
      </div>

      {/* 遮罩层 */}
      {isMenuVisible && (
        <>
          <div className={styles.overlay} onClick={closeMenu}></div>
          <div className={styles.enginesList}>
            {initialEngines.map((engine) => (
              <div
                key={engine.name}
                className={styles.engineItem}
                onClick={() => handleEngineChange(engine)}>
                <img src={engine.favicon}></img>
                <span>{engine.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

// 添加 displayName
Engines.displayName = 'Engines';

export default Engines;
