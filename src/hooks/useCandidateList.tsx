import { useQuery } from '@tanstack/react-query';
import { candidateList } from '../api'; // candidateList 함수 가져오기

export const useCandidateList = () => {
  return useQuery({
    queryKey: ['candidateList'], // 캐시 키
    queryFn: candidateList, // 데이터 가져오기 함수
  });
};
