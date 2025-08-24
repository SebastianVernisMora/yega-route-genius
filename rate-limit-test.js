import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 150 }, // ramp up to 150 users
    { duration: '30s', target: 150 }, // stay at 150 users
  ],
};

export default function () {
  const resRegister = http.post('http://localhost:3000/api/v1/auth/register', JSON.stringify({
    email: `test-${__VU}@test.com`,
    password: 'password',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });
  check(resRegister, {
    'register status is 429': (r) => r.status === 429,
  });

  const resStatus = http.get('http://localhost:3001/api/v1/drivers/status');
  check(resStatus, {
    'status status is 429': (r) => r.status === 429,
  });

  sleep(1);
}
