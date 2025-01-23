import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import SwiperImage from '../../components/SwiperImage/SwiperImage';
import useVoteMutation from '../../hooks/useVoteMutation';
import { useCandidateInfo } from '../../hooks/useCandidateInfo';
import { BeatLoader } from 'react-spinners';

const Profile = () => {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const userId = localStorage.getItem('loginId') || '';
  const [localVoted, setLocalVoted] = useState<boolean>(false);

  // 후보자 상세정보 조회
  const { data, isLoading, error } = useCandidateInfo(id, userId);

  // 후보자에게 투표
  const handleVoteClick = () => {
    if (id === undefined) {
      alert('Candidate ID is required.');
      return;
    }
    mutation.mutate({ id, userId });
  };

  const mutation = useVoteMutation({ setLocalVoted });

  // data 변경 시 로컬 상태 초기화
  useEffect(() => {
    if (data?.voted) {
      setLocalVoted(data.voted);
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="loading">
        <BeatLoader color="#4232d5" />
      </div>
    );
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.profile}>
      <SwiperImage profileInfoList={data.profileInfoList} name={data.name} />

      <div>
        {/* 후보자 기본 정보 */}
        <div className={styles.default}>
          <div className={styles.name}>{data.name}</div>
          <div className={styles.candidateNumber}>Entry No.{data.candidateNumber}</div>
        </div>

        {/* 후보자 상세 정보 */}
        <article className={styles.Detail}>
          <div className={styles.detailItems}>
            <span className={styles.title}>Education</span>
            <span className={styles.content}>{data.education}</span>
          </div>

          <div className={styles.detailItems}>
            <span className={styles.title}>Major</span>
            <span className={styles.content}>{data.major}</span>
          </div>

          <div className={styles.detailItems}>
            <span className={styles.title}>Hobbies</span>
            <span className={styles.content}>{data.hobby}</span>
          </div>

          <div className={styles.detailItems}>
            <span className={styles.title}>Talent</span>
            <span className={styles.content}>{data.talent}</span>
          </div>

          <div className={styles.detailItems}>
            <span className={styles.title}>Ambition</span>
            <span className={styles.content}>{data.ambition}</span>
          </div>
        </article>
      </div>

      <div className="copyRight">COPYRIGHT © WUPSC ALL RIGHT RESERVED.</div>
      <MainButton text="Vote" onClick={handleVoteClick} voted={localVoted} main={false} />
    </div>
  );
};

export default Profile;
