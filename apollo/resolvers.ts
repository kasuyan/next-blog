import { Config } from "apollo-server-micro";

export const resolvers: Config["resolvers"] = {
  Query: {
    getMovies: async () => {
      const res = await fetch('http://www.omdbapi.com/?s=star&apikey=fad91d1e&page=1');
      const data = await res.json();
      return data.Search
    }
  },
};