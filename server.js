import http from 'node:http';

const users = [];

const server = http.createServer((req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const sendJson = (status, data) => {
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    };

    if (req.method === 'POST' && req.url === '/api/v1/auth/register') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const { email, password } = data;
        if (!email) {
          sendJson(400, { message: 'Email required' });
          return;
        }
        if (users.find(u => u.email === email)) {
          sendJson(409, { message: 'User already exists' });
          return;
        }
        const token = `token-${Date.now()}`;
        users.push({ email, password, token });
        sendJson(200, { token });
      } catch {
        sendJson(400, { message: 'Invalid JSON' });
      }
    });
  } else if (req.method === 'POST' && req.url === '/api/v1/auth/login') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const { email, password } = data;
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          sendJson(401, { message: 'Invalid credentials' });
          return;
        }
        sendJson(200, { token: user.token });
      } catch {
        sendJson(400, { message: 'Invalid JSON' });
      }
    });
  } else {
    sendJson(404, { message: 'Not found' });
  }
} catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end('Internal Server Error');
}
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

