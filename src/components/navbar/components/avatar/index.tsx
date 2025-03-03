import React from 'react';
import styles from './index.module.css';

// 定义 Avatar 组件的 props 类型
interface AvatarProps {
  src: string; // 头像的路径
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <div className={styles.avatar}>
      <img src={src} alt="User Avatar" />
    </div>
  );
};

export default Avatar;
