import { gql, Config } from "apollo-server-micro";

export const typeDefs: Config["typeDefs"] = gql`
  type Movie {
    Title: String
    Year: String
    imdbID: String
    Type: String
    Poster: String
  }

  type Query {
    getMovies: [Movie]
  }
`;