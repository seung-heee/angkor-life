import Candidate from '../../components/Candidate/Candidate';
import Timer from '../../components/Timer/Timer';
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
          <p>WORLD MISS UNIVERSITY</p>
          <p>Mobile Voting Information</p>
        </header>
        <div>2024 World Miss University brings together future global leaders who embody both beauty and intellect.</div>

        {/* 컴포넌트화 */}
        <article>
          <div></div>
          <div></div>
        </article>
      </section>

      {/* listUp */}
      <section className={styles.listUp}>
        <header>2024 Cadidate List</header>
        <div>※ You can vote for up to 3 candidates</div>

        {/* 후보자 리스트업 그리드 내부 컴포넌트화 */}
        <div className={styles.candidateBox}>
          <Candidate />
          <Candidate />
        </div>
      </section>
    </div>
  );
};

export default Main;
