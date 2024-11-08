import { defineEventHandler, readBody, H3Event } from 'h3';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users: { [username: string]: string } = {}; // メモリ上でユーザー情報を保持

export default defineEventHandler(async (event: H3Event) => {
  const { req, res } = event.node;
  const body = await readBody(event);
  const { username, password } = body;

  if (req.method === 'POST' && req.url === '/api/register') {
    if (users[username]) {
      res.statusCode = 400;
      return { message: 'User already exists' };
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    users[username] = hashedPassword;

    res.statusCode = 201;
    return { message: 'User registered successfully' };
  }

  if (req.method === 'POST' && req.url === '/api/login') {
    const userPassword = users[username];
    if (!userPassword || !bcrypt.compareSync(password, userPassword)) {
      res.statusCode = 401;
      return { message: 'Invalid username or password' };
    }

    const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
    res.statusCode = 200;
    return { token };
  }

  res.setHeader('Allow', ['POST']);
  res.statusCode = 405;
  return { message: `Method ${req.method} Not Allowed` };
});
