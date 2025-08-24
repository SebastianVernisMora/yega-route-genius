import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 50 },
    { duration: '30s', target: 50 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<150'], // 95% of requests must complete below 150ms
    http_req_failed: ['rate<0.001'], // error rate must be less than 0.1%
  },
};

export default function () {
  const resRegister = http.post('http://localhost:3000/api/v1/auth/register', JSON.stringify({
    email: `test-${__VU}@test.com`,
    password: 'password',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(resRegister, {
    'register status is 200': (r) => r.status === 200,
  });

  const resStatus = http.get('http://localhost:3001/api/v1/drivers/status');
  check(resStatus, {
    'status status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
