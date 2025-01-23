import { useQuery } from '@tanstack/react-query';
import { candidateVotedList } from '../api'; // candidateVotedList 함수 가져오기

export const useVotedCandidatesList = (userId: string) => {
  return useQuery({
    queryKey: ['candidateVotedList', userId], // 캐시 키에 userId 포함
    queryFn: () => candidateVotedList(userId), // 유저 ID 기반 데이터 가져오기 함수
    enabled: !!userId, // userId가 있을 때만 실행
  });
};
