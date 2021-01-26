interface MoiveData {
  Poster: string;
  Title: string;
  Type: string;
  Year:string;
  imdbID: string;
}

export interface MovieList {
  Respons: string;
  Search: MoiveData[];
  totalResults: string;
}

export default function ServerSideRenderingPage({data}:{data:MovieList}) {
  const {Search} = data;

  if(!Search) {
    return (
      <>
        <p>server side rendering</p>
        <p>データがありません</p>
      </>
    )
  }

  return (
    <>
      <p>server side rendering</p>
      <ul>
        {Search.map(item => {
          return <li><h2>{item.Title}</h2>
          <img src={item.Poster} /></li>
        })}
      </ul>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://www.omdbapi.com/?s=star&apikey=fad91d1e&page=1');
  const data:MovieList = await res.json();
  console.log('!!!!!!!!!!!!!!', res)
  console.log('!!!!!!!!!!!!!!', data)
  return {
    props:{data}
  }
}