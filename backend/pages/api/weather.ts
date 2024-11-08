import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors';

const cors = Cors({
  origin: 'http://localhost:3000',
  methods: ['GET'],
});

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: (req: NextApiRequest, res: NextApiResponse, next: (result?: unknown) => void) => void
  ) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result?: unknown) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  const city = req.query.city || 'Okinawa'; 
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`
    );
    const data = await response.json();
    res.status(200).json(data);
  }catch {
  res.status(500).json({ message: "天気情報の取得に失敗しました" });
}

}
