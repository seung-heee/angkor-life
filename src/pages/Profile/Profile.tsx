import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { candidateInfo } from '../../api';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Profile.module.scss';
import MainButton from '../../components/MainButton/MainButton';

const Profile = () => {
  const handleVoteClick = () => {
    console.log('ddd');
  };
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined; // 숫자로 변환

  const { data, isLoading, error } = useQuery({
    queryKey: ['candidateInfo', id],
    queryFn: () => candidateInfo(id as number), // `id`가 undefined가 아님을 보장
    enabled: !!id,
  });

  if (id === undefined || isNaN(id)) {
    return <div>Invalid Candidate ID</div>; // 조건부 리턴 전에 useQuery 호출
  }

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.profile}>
      {/* TODO SwiperImage 컴포넌트화 시키기 */}
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className={styles.swiperImg}
      >
        {data.profileInfoList.map((profile: any, index: number) => (
          <SwiperSlide key={index}>
            <img src={profile.profileUrl} alt={data.name} className={styles.img} />
          </SwiperSlide>
        ))}
      </Swiper>

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
      <MainButton text="Vote" onClick={handleVoteClick} voted={false} />
    </div>
  );
};

export default Profile;
