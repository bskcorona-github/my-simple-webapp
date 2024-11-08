import { defineEventHandler, readBody } from 'h3';

// ユーザー情報を保存するための仮データベース (例: メモリ上)
const users: { username: string; password: string }[] = [];

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // ユーザー名とパスワードが存在するかを確認
  if (!body.username || !body.password) {
    return { error: 'ユーザー名とパスワードを入力してください' };
  }

  // 同じユーザー名が登録されていないかチェック
  const userExists = users.some((user) => user.username === body.username);
  if (userExists) {
    return { error: 'このユーザー名は既に使用されています' };
  }

  // 新しいユーザーを登録
  users.push({ username: body.username, password: body.password });
  return { message: '登録が完了しました' };
});
