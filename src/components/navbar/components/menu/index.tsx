import { useState } from 'react';
import styles from './index.module.css';
import { setLinkMode, setModel } from '@/redux/slice/configSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';

import SwitchButton from '@/components/switchButton';
const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const model = useSelector((state: RootState) => state.config.isStandardModel); // 获取当前 isStandardModel
  const directLink = useSelector(
    (state: RootState) => state.config.isDirectLink
  );

  type Menu = {
    name: string;
    value: boolean;
    change: (value: boolean) => void;
  };

  const models = [
    { name: '标准', value: true },
    { name: '简洁', value: false },
  ];

  const [currentModelIndex, setCurrentModelIndex] = useState(
    models.findIndex((item) => model === item.value)
  );

  const handleModelChange = (index: number) => {
    const modelValue = models[index].value;
    setCurrentModelIndex(index);
    dispatch(setModel(modelValue));
  };

  const handleDirectLinkChange = (value: boolean) => {
    dispatch(setLinkMode(value));
  };

  const menus: Menu[] = [
    {
      name: '当前页面打开',
      value: directLink,
      change: (value) => handleDirectLinkChange(value),
    },
  ];

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
            <span>{model.name}</span>
          </div>
        ))}
        <div
          className={styles.modelLine}
          style={{
            left: `${(currentModelIndex / models.length) * 100}%`,
            width: `${100 / models.length}%`,
          }}></div>
      </div>

      {menus.map((menu) => (
        <div key={menu.name} className={styles.menuItem}>
          <p>{menu.name}</p>
          <SwitchButton initialState={menu.value} onToggle={menu.change} />
        </div>
      ))}
    </div>
  );
};

export default Menu;
