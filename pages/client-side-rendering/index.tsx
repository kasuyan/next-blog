import useSWR from 'swr'
import {useState} from 'react'

const fetcher = url => fetch(url).then(res => res.json())

export default function ServerSideRenderingPage() {
  const [pageIndex, setPageIndex] = useState(1);

  const movieData = useSWR(`http://www.omdbapi.com/?s=pokemon&apikey=fad91d1e&page=${pageIndex}`, fetcher)
  const helloData = useSWR('/api/hello', fetcher)
  
  if (movieData.error || helloData.error) return <div>failed to load</div>
  if (!movieData.data || !helloData.data) return <div>loading...</div>
  const {Search} = movieData.data;

  if(!Search) {
    return (
      <>
        <p>a:{helloData.data.text}</p>
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
      <p>{helloData.data?.text}</p>
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