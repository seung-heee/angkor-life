import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://api-wmu-dev.angkorcoms.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 후보자 리스트 조회
export async function candidateList() {
  const params = { sort: 'name,ASC' };

  try {
    const response = await api.get('/vote/candidate/list', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch candidate list:', error);
    throw error;
  }
}

// 투표한 후보들의 id 리스트를 조회
export async function candidateVotedList(userId: string) {
  const params = { userId };

  try {
    const response = await api.get('/vote/voted/candidate/list', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch candidate voted list:', error);
    throw error;
  }
}

// 후보자 상세정보 조회
export async function candidateInfo(id: number, userId: string) {
  if (!id || !userId) {
    throw new Error(`Invalid parameters: ${!id ? 'Candidate ID is required.' : ''} ${!userId ? 'User ID is required.' : ''}`.trim());
  }

  const params = { userId };

  try {
    const response = await api.get(`/vote/candidate/${id}`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch candidate info:', error);
    throw error;
  }
}

// 투표하기
export async function vote(id: number, userId: string) {
  const body = { id, userId };

  try {
    const response = await api.post('/vote', body);
    return response.data;
  } catch (error) {
    console.error(`Failed to vote for candidate ID: ${id}`, error);
    throw error;
  }
}
