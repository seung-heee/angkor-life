import React from 'react';
import styles from './MainButton.module.scss';

type MainButtonProps = {
  text: string;
  onClick: () => void;
  voted: boolean;
  main: boolean;
};

const MainButton = ({ text, onClick, voted, main }: MainButtonProps) => {
  return (
    <div className={styles.mainBtnBox}>
      <button onClick={onClick} disabled={voted} className={`${styles.mainBtn} ${voted ? styles.voted : styles.notVoted} ${main ? styles.mainPadding : ''}`}>
        {voted ? 'Voted' : text}
      </button>
    </div>
  );
};

export default MainButton;
