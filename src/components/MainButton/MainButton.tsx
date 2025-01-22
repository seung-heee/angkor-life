import React from 'react';
import styles from './MainButton.module.scss';

type MainButtonProps = {
  text: string;
  onClick: () => void;
  voted: boolean;
};

const MainButton = ({ text, onClick, voted }: MainButtonProps) => {
  return (
    <div className={styles.mainBtnBox}>
      <button onClick={onClick} disabled={voted} className={voted ? styles.voted : styles.mainBtn}>
        {text}
      </button>
    </div>
  );
};

export default MainButton;
