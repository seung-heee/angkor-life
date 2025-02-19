import { useNavigate } from 'react-router-dom';
import styles from './Candidate.module.scss';
import MainButton from '../MainButton/MainButton';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useVoteMutation from '../../hooks/useVoteMutation';

interface CandidateProps {
  candidate: {
    candidateNumber: number;
    id: number;
    name: string;
    profileUrl: string;
    voteCnt: number;
  };
  voted?: boolean;
  isCompleted?: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Candidate = ({ candidate, voted, isCompleted, setIsModalOpen }: CandidateProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('loginId') || '';
  const [localVoted, setLocalVoted] = useState<boolean>(false); // 로컬 투표 여부
  const [localVoteCnt, setLocalVoteCnt] = useState<number>(Number(candidate.voteCnt)); // 로컬 투표 수

  // 후보자에게 투표
  const handleVoteClick = () => {
    if (candidate.id === undefined) {
      alert('Candidate ID is required.');
      return;
    }
    mutation.mutate({ id: candidate.id, userId });
  };

  const mutation = useVoteMutation({ setLocalVoteCnt, setLocalVoted, setIsModalOpen });

  // 초기 투표 상태 업데이트
  useEffect(() => {
    if (voted !== undefined) {
      setLocalVoted(voted);
    }
  }, [voted]);

  return (
    <div className={styles.candidate}>
      <button
        onClick={() => {
          navigate(`/profile/${candidate.id}`, { state: { isCompleted } });
        }}
        className={styles.candidateBox}
      >
        <div className={styles.candidateImage}>
          <img src={candidate.profileUrl} alt={`${candidate.name}`} />
        </div>
        <div className={`${styles.candidateInfo}`}>
          <span className={styles.name}>{candidate.name}</span>
          <span className={styles.voted}>{localVoteCnt} voted</span>
        </div>
      </button>
      <MainButton text="Vote" onClick={handleVoteClick} voted={localVoted} main={true} isCompleted={isCompleted} />
    </div>
  );
};

export default Candidate;
