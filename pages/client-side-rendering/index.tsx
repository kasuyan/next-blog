import useSWR from 'swr'
import {useState} from 'react'

const fetcher = url => fetch(url).then(res => res.json())

export default function ServerSideRenderingPage() {
  const [pageIndex, setPageIndex] = useState(1);

  const {data, error} = useSWR(`http://www.omdbapi.com/?s=home&apikey=fad91d1e&page=${pageIndex}`, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const {Search} = data;

  if(!Search) {
    return (
      <>
        <p>client side rendering</p>
        <p>pageIndex: {pageIndex}</p>
        <button onClick={() => setPageIndex(pageIndex - 1)}>prev</button>
        <button onClick={() => setPageIndex(pageIndex + 1)}>next</button>
        <p>データがありません:P</p>
      </>
    )
  }
  
  return (
    <>
      <p>client side rendering</p>
      <p>pageIndex: {pageIndex}</p>
      <button onClick={() => setPageIndex(pageIndex - 1)}>prev</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>next</button>
      <ul>
        {Search.map(item => {
          return <li key={item.imdbID}><h2>{item.Title}</h2>
          <img src={item.Poster} /></li>
        })}
      </ul>
    </>
  )
}