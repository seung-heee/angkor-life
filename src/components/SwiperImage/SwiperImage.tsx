import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './SwiperImage.module.scss';

// Props 타입 정의
interface SwiperImageProps {
  profileInfoList: {
    profileUrl: string;
  }[];
  name: string;
}

const SwiperImage = ({ profileInfoList, name }: SwiperImageProps) => {
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className={styles.swiperImg}
    >
      {profileInfoList.map((profile, index) => (
        <SwiperSlide key={index}>
          <img src={profile.profileUrl} alt={name} className={styles.img} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperImage;
