import React from 'react';
import styles from './index.module.css';

const Avatar: React.FC = () => {
  return (
    <>
      <div className={styles.avatar}>
        <img src="avatar.jpg"></img>
      </div>
    </>
  );
};

export default Avatar;
