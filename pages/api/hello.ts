import { NextApiRequest, NextApiResponse } from 'next'
import useSWR from 'swr'


const fetcher = url => fetch(url).then(res => res.json())

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const data = await fetch(`http://www.omdbapi.com/?s=load&apikey=fad91d1e&page=1`);
  if (!data.ok) {
    throw Error("Yo that's NOT OK!!!");
  }

  const movies = await data.json();
  res.status(200).json(movies)
}