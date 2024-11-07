import { NextApiRequest,NextApiResponse } from "next";
import Cors from 'cors'

const cors =Cors({
    methods:['GET','HEAD'],
    origin:'http://localhost:3000'
})
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn:(req: NextApiRequest, res: NextApiResponse, next: (result?: Error) => void) => void ) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result?: Error) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
  }
export default async function handler(req:NextApiRequest, res:NextApiResponse){
    await runMiddleware(req,res,cors)
    res.status(200).json({message:"hello from next.js api(これはバックエンド側で書いているメッセージです)"})
}