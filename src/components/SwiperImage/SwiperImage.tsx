import styles from './SwiperImage.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

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
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
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
