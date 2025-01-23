import { useNavigate } from 'react-router-dom';
import styles from './Candidate.module.scss';
import MainButton from '../MainButton/MainButton';
import { useEffect, useState } from 'react';
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
}

const Candidate = ({ candidate, voted }: CandidateProps) => {
  const userId = localStorage.getItem('loginId') || '';
  const navigate = useNavigate();
  const [localVoted, setLocalVoted] = useState<boolean>(false);
  const [localVoteCnt, setLocalVoteCnt] = useState<number>(Number(candidate.voteCnt));

  // 후보자 상세페이지로 이동
  const handleProfile = () => {
    navigate(`/profile/${candidate.id}`);
  };

  // 후보자에게 투표
  const handleVoteClick = () => {
    if (candidate.id === undefined) {
      alert('Candidate ID is required.');
      return;
    }
    mutation.mutate({ id: candidate.id, userId });
  };

  const mutation = useVoteMutation({ setLocalVoteCnt, setLocalVoted });

  // 초기 투표 상태 업데이트
  useEffect(() => {
    if (voted !== undefined) {
      setLocalVoted(voted);
    }
  }, [voted]);

  return (
    <div className={styles.candidate}>
      <button onClick={handleProfile} className={styles.candidateBox}>
        <div className={styles.candidateImage}>
          <img src={candidate.profileUrl} alt={`${candidate.name}`} />
        </div>
        <div className={styles.candidateInfo}>
          <span className={styles.name}>{candidate.name}</span>
          <span className={styles.voted}>{localVoteCnt} votes</span>
        </div>
      </button>
      <MainButton text="Vote" onClick={handleVoteClick} voted={localVoted} main={true} />
    </div>
  );
};

export default Candidate;
