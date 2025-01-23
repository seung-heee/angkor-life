import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { candidateInfo } from '../../api';
import styles from './Profile.module.scss';
import MainButton from '../../components/MainButton/MainButton';
import SwiperImage from '../../components/SwiperImage/SwiperImage';
import useVoteMutation from '../../hooks/useVoteMutation';

const Profile = () => {
  const userId = localStorage.getItem('loginId') || '';
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined; // 숫자로 변환
  const [localVoted, setLocalVoted] = useState<boolean>(false);

  // 후보자에게 투표
  const handleVoteClick = () => {
    if (id === undefined) {
      alert('Candidate ID is required.');
      return;
    }

    mutation.mutate({ id, userId }); // mutation 실행
  };

  const mutation = useVoteMutation({ setLocalVoted });

  const { data, isLoading, error } = useQuery({
    queryKey: ['candidateInfo', id],
    queryFn: () => candidateInfo(id as number, userId), // `userId`를 추가로 전달
    enabled: !!id && !!userId, // `id`와 `userId`가 유효한 경우만 실행
  });

  // data가 변경될 때 localVoted 초기화
  useEffect(() => {
    if (data?.voted !== undefined) {
      setLocalVoted(data.voted);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (id === undefined || isNaN(id)) {
    return <div>Invalid Candidate ID</div>; // 조건부 리턴 전에 useQuery 호출
  }

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
