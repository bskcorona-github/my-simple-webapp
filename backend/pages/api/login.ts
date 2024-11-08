import { defineEventHandler, readBody } from 'h3';

interface User {
  username: string;
  password: string;
}

// 仮のメモリ上のユーザーデータベース
const users: User[] = [
  { username: 'testuser', password: 'password123' } // テスト用のユーザー情報
];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // ユーザー名とパスワードが存在するかを確認
  if (!body.username || !body.password) {
    return { error: 'ユーザー名とパスワードを入力してください' };
  }

  // 登録済みユーザーの検索
  const user = users.find(
    (user) => user.username === body.username && user.password === body.password
  );

  if (!user) {
    return { error: 'ユーザー名またはパスワードが間違っています' };
  }

  return { message: 'ログインに成功しました' };
});
