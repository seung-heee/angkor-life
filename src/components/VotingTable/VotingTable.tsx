import React from 'react';
import styles from './VotingTable.module.scss';

const VotingTable = () => {
  return (
    <article className={styles.votingTableContainer}>
      <div className={styles.votingTable}>
        <span className={styles.title}>Period</span>
        <span className={styles.content}>10/17(Thu) 12PM - 10/31(Thu) 6PM</span>
      </div>
      <div className={styles.votingTable}>
        <span className={styles.title}>How to vote</span>
        <ul className={styles.content}>
          <li>Up to three people can participate in early voting per day. </li>
          <li>Three new voting tickets are issued every day at midnight (00:00), and you can vote anew every day during the early voting period</li>
        </ul>
      </div>
    </article>
  );
};

export default VotingTable;
