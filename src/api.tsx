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
