import styles from './Candidate.module.scss';
import React from 'react';

const Candidate = () => {
  return (
    <div className={styles.candidate}>
      <button className={styles.candidateImage}>
        <img src="/assets/images/testImg.png" alt="candidate Image" />
      </button>
      <div className={styles.candidateInfo}>
        <span className={styles.name}>name</span>
        <span className={styles.voted}>voted</span>
        <button className={styles.votedButton}>Vote</button>
      </div>
    </div>
  );
};

export default Candidate;
