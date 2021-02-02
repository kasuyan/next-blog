
import {GetStaticProps, GetStaticPaths} from 'next'
import {MovieList} from '../server-side-rendering'
import {ApolloClient, InMemoryCache, gql} from '@apollo/client'

export default function Ssg ({data, launches}:{data:MovieList, launches:any}) {
  const {Search} = data;
  console.log('launches', launches)
  console.log('Search', Search)

  return (
    <>
      <p>SSG</p>
      <div style={{display:'flex'}}>
      <ul>
        {launches.map(item => {
          return <li key={item.id}>
            <h2>mission_name:{item.mission_name}</h2>
            <h3>rocket_name:{item.rocket.rocket_name}</h3>
            {!!item.ships.length &&  <img src={item.ships[0].image} width="300" />}
          </li>
        })}
      </ul>
      <ul>
        {Search.map(item => {
          return <li key={item.imdbID}><h2>{item.Title}</h2>
          <img src={item.Poster} /></li>
        })}
      </ul>
      </div>
    </>
  )
}


export const getStaticProps:GetStaticProps = async ({params}) => {
  // spacex
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  })

  const spacexData = await client.query({
    query: gql`
      query GetLaunchesPast {
        launchesPast(limit: 5) {
          id
          mission_name
          rocket {
            rocket_name
          }
          ships {
            image
          }
        }
      }
    `
  });

  // movie
  const id = params.id
  const res = await fetch(`http://www.omdbapi.com/?s=${id}&apikey=fad91d1e&page=1`);
  const data:MovieList = await res.json();

  return {
    props:{
      data,
      launches:spacexData.data.launchesPast
    }
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