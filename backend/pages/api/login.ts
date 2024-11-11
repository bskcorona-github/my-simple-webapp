import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// 初期化 - 設定に合わせてオリジンを指定します
const cors = Cors({
  methods: ['POST', 'OPTIONS'],
  origin: 'http://localhost:3000', // フロントエンドのURL (Nuxt.js のURL)
});

// Middleware の実行関数
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: (req: NextApiRequest, res: NextApiResponse, next: (result?: unknown) => void) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result?: unknown) => {
      if (typeof result !== 'undefined' && result instanceof Error) {  // result が undefined でないことを確認
        return reject(result);
      }
      return resolve();
    });
  });
}





export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS ミドルウェアを実行
  await runMiddleware(req, res, cors);

  const { username, password } = req.body;

  // ユーザー名とパスワードのチェック
  if (username === 'testuser' && password === 'password123') {
    const token = 'sample_token';
    res.status(200).json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'ユーザー名またはパスワードが違います' });
  }
}
