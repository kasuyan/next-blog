

import {ApolloClient, InMemoryCache, gql} from '@apollo/client'
import {useEffect} from 'react'

const StaticPage =  () => {
  
  const getData = async () => {
    const client = new ApolloClient({
      uri: '/api/graphql',
      cache: new InMemoryCache()
    })
    const data = await client.query({
      query: gql`
      query {
        getMovies{
          Title
        }
      }
      `
    });
    console.log('data', data)
  }

  useEffect(() => {
    getData();
  })

  return (
    <ul>
      <li>sample article1</li>
      <li>sample article2</li>
      <li>sample article3</li>
      <li>sample article4</li>
      <li>sample article5</li>
    </ul>
  )
}

export default StaticPage;