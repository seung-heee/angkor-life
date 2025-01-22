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
  const params = {
    sort: 'name,ASC', // 후보자 이름순으로 정렬
  };

  return await api.get('/vote/candidate/list', { params }).then((res) => res.data);
}

// 후보자 상세정보 조회
export async function candidateInfo(id: number) {
  if (id === undefined || id === null) {
    throw new Error('Invalid candidate ID');
  }

  const params = {
    userId: 'userA',
  };

  return await api.get(`/vote/candidate/${id}`, { params }).then((res) => res.data);
}
