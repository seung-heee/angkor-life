import Candidate from '../../components/Candidate/Candidate';
import Timer from '../../components/Timer/Timer';
import VotingTable from '../../components/VotingTable/VotingTable';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <div>
      {/* mainTitle */}
      <section className={styles.mainTitle}>
        <img src="/assets/images/mainTop.svg" alt="Main Top" />
        <img className="mainBottom" src="/assets/images/mainBottom.svg" alt="Main Bottom" />
        <Timer targetDate="2025-02-03T00:00:00" />
      </section>

      {/* votingInfo */}
      <section className={styles.votingInfo}>
        <header>
          <div className={styles.subHeader}>WORLD MISS UNIVERSITY</div>
          <div className={styles.header}>
            Mobile Voting
            <br /> Information
          </div>
          <div className={styles.info}>
            2024 World Miss University brings <br />
            together future global leaders who embody both
            <br /> beauty and intellect.
          </div>
        </header>
        <VotingTable />
      </section>

      {/* listUp */}
      <section className={styles.listUp}>
        <header>
          <div className={styles.subHeader}></div>
          <div className={styles.header}>
            2024
            <br /> Cadidate List
          </div>
          <div className={styles.info}>※ You can vote for up to 3 candidates</div>
        </header>

        {/* 후보자 리스트업 그리드 내부 컴포넌트화 */}
        <div className={styles.candidateBox}>
          <Candidate />
          <Candidate />
          <Candidate />
          <Candidate />
        </div>
      </section>
    </div>
  );
};

export default Main;
