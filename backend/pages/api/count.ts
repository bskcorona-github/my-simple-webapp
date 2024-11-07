import { NextApiRequest,NextApiResponse } from "next";

let visitCount=0;

export default function handler(req:NextApiRequest,res:NextApiResponse){
    visitCount++;
    res.status(200).json({count:visitCount})
}