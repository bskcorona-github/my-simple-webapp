import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'],
});

function runMiddleware(
    req: NextApiRequest, 
    res: NextApiResponse, 
    fn: (req:NextApiRequest,res:NextApiResponse,next:(result?:unknown)=>void)=>void) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// メモリ上にタスクを保持するための配列
let todos: { id: number; text: string }[] = [];
let idCounter = 1;

// APIのハンドラー
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);
  if (req.method === 'GET') {
    // タスク一覧の取得
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    // 新しいタスクの追加
    const { text } = req.body;
    const newTodo = { id: idCounter++, text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
    console.log(`タスク[${text}]が追加されました`);
  } else if (req.method === 'DELETE') {
    // タスクの削除
    const { id } = req.body;
    todos = todos.filter(todo => todo.id !== id);
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
