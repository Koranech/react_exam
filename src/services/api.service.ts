import type {IResponse} from "../models/IResponse.ts";
import type {IMovie} from "../models/IMovie.ts";
import type {IGenre} from "../models/IGenre.ts";
import {axiosInstance} from "../constants/constants.ts";


export const movieService = {
    getMovies: async (page: number): Promise<IResponse> => {
        const {data} = await axiosInstance.get<IResponse>(`/discover/movie?page=${page}`)
        return data
    },
    getById: async (id: number): Promise<IMovie> => {
        const {data: movie} = await axiosInstance.get<IMovie>(`/movie/${id}`)
        return movie
    },
    searchMovies: async (query: string, page: number): Promise<IResponse> => {
        const {data} = await axiosInstance.get<IResponse>(`/search/movie?query=${query}&page=${page}`)
        return data
    },
    getGenres: async (): Promise<IGenre[]> => {
        const {data} = await axiosInstance.get<{genres: IGenre[]}>('/genre/movie/list')
        return data.genres
    },
    getMoviesByGenres: async (genreIds: number[], page: number):Promise<IResponse> => {
        const {data} = await axiosInstance.get(`/discover/movie?with_genres=${genreIds.join(',')}&page=${page}`)
        return data
    }

}
