import { useState } from 'react';
import { Model } from '@/types';
import styles from './index.module.css';
import { setModel } from '@/redux/slice/configSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const model = useSelector((state: RootState) => state.config.model); // 获取当前 model

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

  const [currentModelIndex, setCurrentModelIndex] = useState(model);

  const handleModelChange = (index: number) => {
    const modelValue = models[index].value;
    setCurrentModelIndex(modelValue);
    dispatch(setModel(modelValue));
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
        <div
          className={styles.modelLine}
          style={{
            left: `${(currentModelIndex / models.length) * 100}%`,
            width: `${100 / models.length}%`,
          }}></div>
      </div>
    </div>
  );
};

export default Menu;
