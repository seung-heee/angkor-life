import React from 'react';
import styles from './MainButton.module.scss';

type MainButtonProps = {
  text: string;
  onClick: () => void;
};

const MainButton = ({ text, onClick }: MainButtonProps) => {
  return (
    <div className={styles.mainBtnBox}>
      <button onClick={onClick} className={styles.mainBtn}>
        {text}
      </button>
    </div>
  );
};

export default MainButton;
