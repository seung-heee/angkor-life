import { useQuery } from '@tanstack/react-query';
import { candidateInfo } from '../api';

export const useCandidateInfo = (id: number | undefined, userId: string) => {
  return useQuery({
    queryKey: ['candidateInfo', id], // 캐시 키
    queryFn: () => candidateInfo(id as number, userId), // id와 userId를 전달
    enabled: !!id && !!userId, // id와 userId가 유효할 때만 실행
  });
};
