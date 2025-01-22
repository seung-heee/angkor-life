import styles from './Candidate.module.scss';
import React from 'react';

const Candidate = () => {
  return (
    <div>
      <img src="/assets/images/testImg.png" alt="candidate Image" />
      <div className={styles.candidateInfo}>
        <span>name</span>
        <span>voted</span>
        <button>Vote</button>
      </div>
    </div>
  );
};

export default Candidate;
