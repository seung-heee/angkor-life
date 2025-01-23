import styles from './MainButton.module.scss';

type MainButtonProps = {
  text: string;
  onClick: () => void;
  voted: boolean;
  main: boolean;
  isCompleted?: boolean;
};

const MainButton = ({ text, onClick, voted, main, isCompleted }: MainButtonProps) => {
  return (
    <div className={styles.mainBtnBox}>
      <button
        onClick={onClick}
        disabled={voted || isCompleted}
        className={`${styles.mainBtn} ${voted ? styles.voted : styles.notVoted} ${main && styles.mainPadding} ${!isCompleted && styles.cursor}`}
      >
        {voted ? (
          <div className={styles.votedStyle}>
            <img src="/assets/images/Voted.svg" alt="voted" />
            <span>Voted</span>
          </div>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default MainButton;
