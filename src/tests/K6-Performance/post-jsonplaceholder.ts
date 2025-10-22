import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 10 virtual users
  duration: '30s', // Chạy 30 giây
  thresholds: {
    'http_req_duration': ['p(95)<500'], // 95% request < 500ms (threshold chung cho response time)
    'http_req_failed': ['rate<0.01'], // Tỷ lệ lỗi < 1%
    checks: ['rate>0.99'], // 99% checks pass (status, body)
  },
};

export default function () {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const payload = JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1,
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(url, payload, params);
  
  check(res, {
    'Status is 201': (r) => r.status === 201,
    'Response has id': (r) => {
      const id = r.json('id');
      return id !== null && typeof id === 'number' && id > 0;
    },
  });

  sleep(1); // Nghỉ 1s giữa các request
}