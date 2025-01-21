import React from 'react';
import styles from './Input.module.scss';

const Input = () => {
  return (
    <div className={styles.inputBox}>
      <input className={styles.input} type="text" placeholder="Enter your ID" />
    </div>
  );
};

export default Input;
