
import {GetStaticProps, GetStaticPaths} from 'next'
import {MovieList} from '../server-side-rendering'

export default function Ssg ({data}:{data:MovieList}) {
  const {Search} = data;
  return (
    <>
      <p>SSG</p>
      <ul>
        {Search.map(item => {
          return <li><h2>{item.Title}</h2>
          <img src={item.Poster} /></li>
        })}
      </ul>
    </>
  )
}


export const getStaticProps:GetStaticProps = async ({params}) => {
  const id = params.id
  const res = await fetch(`http://www.omdbapi.com/?s=${id}&apikey=fad91d1e&page=1`);
  const data:MovieList = await res.json();

  return {
    props:{data}
  }
}

export const getStaticPaths:GetStaticPaths = async () => {
  return {
    paths: [
      {params: {id: 'star'}}
    ],
    fallback: false
  }
}