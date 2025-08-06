// server.ts
import { WebSocketServer } from 'ws';
import Redis from 'ioredis';

const wss = new WebSocketServer({ port: 8080 });
const redis = new Redis(process.env.REDIS_URL);

// 在线用户映射
const clients = new Map<string, WebSocket>();

// 订阅 Redis 消息
redis.subscribe('chat:global');
redis.on('message', (_channel, message) => {
  const { to } = JSON.parse(message);
  if (clients.has(to)) {
    clients.get(to)?.send(message);
  }
});

wss.on('connection', (ws, req) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const userId = url.searchParams.get('user_id');
  const token = url.searchParams.get('token');

  // TODO: 验证 token（调用 Vercel 的 /api/verify）
  if (!isValid(token)) {
    ws.close();
    return;
  }

  clients.set(userId, ws);

  ws.on('close', () => {
    clients.delete(userId);
  });

  ws.on('message', (data) => {
    // ❌ 不要在这里广播！应该回传给 Vercel 处理
    console.log("客户端发送消息，应通过 HTTPS 发给 Vercel");
  });
});

console.log('WS Server running on ws://localhost:8080');