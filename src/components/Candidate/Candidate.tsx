import { useNavigate } from 'react-router-dom';
import styles from './Candidate.module.scss';
import MainButton from '../MainButton/MainButton';
import { useMutation } from '@tanstack/react-query';
import { vote } from '../../api';
import { useEffect, useState } from 'react';

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

  const handleProfile = () => {
    navigate(`/profile/${candidate.id}`);
  };

  // 버튼 클릭 핸들러
  const handleVoteClick = () => {
    if (candidate.id === undefined) {
      alert('Candidate ID is required.');
      return;
    }

    mutation.mutate({ id: candidate.id, userId }); // mutation 실행
  };

  // useMutation 설정
  const mutation = useMutation({
    mutationFn: (variables: { id: number; userId: string }) => vote(variables.id, variables.userId),
    onSuccess: () => {
      setLocalVoted((prev) => !prev); // 상태 반전
    },
    onError: (error: any) => {
      console.error('Vote failed:', error);
      alert('Failed to submit your vote. Please try again.');
    },
  });

  // voted 변경될 때 localVoted 초기화
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
          <span className={styles.voted}>{candidate.voteCnt} votes</span>
        </div>
      </button>
      <MainButton text="Vote" onClick={handleVoteClick} voted={localVoted} main={true} />
    </div>
  );
};

export default Candidate;
