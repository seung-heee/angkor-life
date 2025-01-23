import { useMutation, useQueryClient } from '@tanstack/react-query';
import { vote } from '../api';

interface VoteVariables {
  id: number;
  userId: string;
}

interface MutationOptions {
  setLocalVoteCnt?: (value: (prev: number) => number) => void;
  setLocalVoted?: (value: (prev: boolean) => boolean) => void;
}

const useVoteMutation = ({ setLocalVoteCnt, setLocalVoted }: MutationOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userId }: VoteVariables) => vote(id, userId),
    onMutate: async () => {
      // 선택적으로 로컬 상태 업데이트
      if (setLocalVoteCnt) setLocalVoteCnt((prev) => prev + 1);
      if (setLocalVoted) setLocalVoted(() => true);
    },
    onSuccess: () => {
      // 캐시 무효화로 서버와 동기화
      queryClient.invalidateQueries({ queryKey: ['candidateList'] });
      queryClient.invalidateQueries({ queryKey: ['candidateVotedList'] });
    },
    onError: (error) => {
      console.error('Vote failed:', error);
      alert('Failed to submit your vote. Please try again.');

      // 선택적으로 상태 롤백
      if (setLocalVoteCnt) setLocalVoteCnt((prev) => prev - 1);
      if (setLocalVoted) setLocalVoted(() => false);
    },
  });
};

export default useVoteMutation;
