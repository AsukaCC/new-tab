import React, { useState } from 'react';
import styles from './index.module.css';

interface SwitchButtonProps {
  initialState: boolean;
  onToggle: (state: boolean) => void; // 状态切换时的回调
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  initialState,
  onToggle,
}) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle(newState);
  };

  return (
    <div
      className={`${styles.container} ${isOn ? styles.active : ''}`}
      onClick={handleToggle}
      role="button"
      aria-pressed={isOn}>
      <div className={styles.wrapper}>
        <div className={`${styles.circle} ${isOn ? styles.active : ''}`}></div>
      </div>
    </div>
  );
};

export default SwitchButton;
