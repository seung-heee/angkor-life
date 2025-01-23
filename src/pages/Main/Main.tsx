import Candidate from '../../components/Candidate/Candidate';
import Timer from '../../components/Timer/Timer';
import VotingTable from '../../components/VotingTable/VotingTable';
import styles from './Main.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal/Modal';
import { useCandidateList } from '../../hooks/useCandidateList';
import { useVotedCandidatesList } from '../../hooks/useVotedCandidatesList';

interface CandidateData {
  candidateNumber: number;
  id: number;
  name: string;
  profileUrl: string;
  voteCnt: number;
}

const Main = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('loginId') || '';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmModal = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  // 후보자 리스트 조회
  const { data: candidatesData, isLoading: isCandidatesLoading, error: candidatesError } = useCandidateList();

  // 투표한 후보자 리스트 조회
  const { data: votedCandidatesData, isLoading: isVotedCandidatesLoading, error: votedCandidatesError } = useVotedCandidatesList(userId);

  // 3명 이상의 후보자에게 투표했을 경우 모달창
  useEffect(() => {
    if (votedCandidatesData?.length >= 3) {
      setIsModalOpen(true);
    }
  }, [votedCandidatesData]);

  if (isCandidatesLoading || isVotedCandidatesLoading) return <p>Loading...</p>;
  if (candidatesError || votedCandidatesError) return <p>Error occurred!</p>;

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
            <br /> Candidate List
          </div>
          <div className={styles.info}>※ You can vote for up to 3 candidates</div>
        </header>

        <div className={styles.candidateBox}>
          {candidatesData?.content.map((candidate: CandidateData) => (
            <Candidate key={candidate.id} candidate={candidate} voted={votedCandidatesData?.includes(candidate.id)} />
          ))}
        </div>
      </section>
      <div className="copyRight">COPYRIGHT © WUPSC ALL RIGHT RESERVED.</div>
      <Modal isOpen={isModalOpen} onConfirm={handleConfirmModal} confirmText="Confirm" />
    </div>
  );
};

export default Main;
