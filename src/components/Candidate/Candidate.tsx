import { useNavigate } from 'react-router-dom';
import styles from './Candidate.module.scss';
import MainButton from '../MainButton/MainButton';

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
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate(`/profile/${candidate.id}`);
  };

  return (
    <div className={styles.candidate}>
      <button onClick={handleProfile} className={styles.candidateImage}>
        <img src={candidate.profileUrl} alt={`${candidate.name}`} />
      </button>
      <div className={styles.candidateInfo}>
        <span className={styles.name}>{candidate.name}</span>
        <span className={styles.voted}>{candidate.voteCnt} votes</span>
        <button className={styles.votedButton}>Vote</button>
      </div>
      <MainButton text="Vote" onClick={() => console.log('temp')} voted={voted ?? false} />
    </div>
  );
};

export default Candidate;
