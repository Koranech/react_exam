import type {IGenre} from "./IGenre.ts";

export interface IMovie {
   adult: boolean;
   backdrop_path: string;
   genre_ids: number[];
   genres?: IGenre[];
   id: number;
   title: string;
   original_language: string;
   original_title: string;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   softcore: boolean;
   video: boolean;
   vote_average: number;
   vote_count: number;
}
