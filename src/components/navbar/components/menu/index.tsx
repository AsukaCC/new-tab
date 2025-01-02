import { useEffect, useState } from 'react';
import { Model } from '@/types';
import styles from './index.module.css';

const Menu: React.FC = () => {
  const models: Model[] = [
    {
      name: '标准',
      value: 0,
    },
    {
      name: '简洁',
      value: 1,
    },
  ];

  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userConfig = localStorage.getItem('userConfig');
    if (userConfig) {
      const config = JSON.parse(userConfig);
      setCurrentModelIndex(config.model);
    } else {
      console.log('init fail');
      setCurrentModelIndex(0);
    }
    setIsReady(true);
  }, []);

  const handleModelChange = (index: number) => {
    setCurrentModelIndex(index);
    const userConfig = localStorage.getItem('userConfig');
    if (userConfig) {
      const config = JSON.parse(userConfig);
      const model = models[index];
      config.model = model.value;
      localStorage.setItem('userConfig', JSON.stringify(config));
    }
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.modelContainer}>
        {models.map((model, index) => (
          <div
            key={model.name}
            className={`${styles.modelItem} ${
              index === currentModelIndex ? styles.active : ''
            }`}
            onClick={() => handleModelChange(index)}>
            {model.name}
          </div>
        ))}
        {isReady && (
          <div
            className={styles.modelLine}
            style={{
              left: `${(currentModelIndex / models.length) * 100}%`,
              width: `${100 / models.length}%`,
            }}></div>
        )}
      </div>
    </div>
  );
};

export default Menu;
