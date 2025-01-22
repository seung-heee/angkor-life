import { useQuery } from '@tanstack/react-query';
import Candidate from '../../components/Candidate/Candidate';
import Timer from '../../components/Timer/Timer';
import VotingTable from '../../components/VotingTable/VotingTable';
import styles from './Main.module.scss';
import { candidateList, candidateVotedList } from '../../api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CandidateData {
  candidateNumber: number;
  id: number;
  name: string;
  profileUrl: string;
  voteCnt: number;
}

const Main = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('loginId') || ''; // 로컬 스토리지에서 userId 가져오기

  // 전체 후보자 리스트 가져오기
  const {
    data: candidatesData,
    isLoading: isCandidatesLoading,
    error: candidatesError,
  } = useQuery<{
    content: CandidateData[];
  }>({
    queryKey: ['candidateList'],
    queryFn: candidateList,
  });

  // 투표한 후보자 ID 리스트 가져오기
  const {
    data: votedCandidatesData,
    isLoading: isVotedCandidatesLoading,
    error: votedCandidatesError,
  } = useQuery<number[]>({
    queryKey: ['candidateVotedList', userId],
    queryFn: () => candidateVotedList(userId),
    enabled: !!userId, // userId가 있을 때만 실행
  });

  // votedCandidatesData 변경 감지 및 경고창 로직
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Array.isArray(votedCandidatesData) && votedCandidatesData.length >= 3) {
        alert('투표는 최대 3명까지만 가능합니다.');
        navigate('/');
      }
    }, 500); // 0.5초 지연

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [votedCandidatesData]);

  if (isCandidatesLoading || isVotedCandidatesLoading) return <div>Loading...</div>;
  if (candidatesError) return <div>Error: {candidatesError.message}</div>;
  if (votedCandidatesError) return <div>Error: {votedCandidatesError.message}</div>;

  console.log('All Candidates:', candidatesData);
  console.log('Voted Candidate IDs:', votedCandidatesData);
  console.log('max', votedCandidatesData?.length);

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
            <Candidate
              key={candidate.id}
              candidate={candidate}
              voted={votedCandidatesData?.includes(candidate.id)} // 투표 여부 전달
            />
          ))}
        </div>
      </section>
      <div className="copyRight">COPYRIGHT © WUPSC ALL RIGHT RESERVED.</div>
    </div>
  );
};

export default Main;
