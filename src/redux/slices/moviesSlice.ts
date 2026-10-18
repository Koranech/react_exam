import type {IMovie} from "../../models/IMovie.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IResponse} from "../../models/IResponse.ts";
import {movieService} from "../../services/api.service.ts";

type MoviesState = {
    movies: IMovie[],
    totalPages: number,
    isLoading: boolean,
    error: string | null,
}

const initialState: MoviesState = {
    movies: [],
    totalPages: 1,
    isLoading: false,
    error: null,
}

type LoadMoviesArgs = {
    page: number,
    search?: string,
    genreIds?: string,
    // Якщо є search - це пошук, якщо genreIds - фільтр за жанрами, якщо нема обох - це звичайний список
}

export const loadMovies = createAsyncThunk<IResponse, LoadMoviesArgs, { rejectValue: string }>(
    'movies/loadMovies',
    async ({page, search, genreIds}, thunkAPI) => {
        try {
            if (genreIds) {
                const ids = genreIds.split(',').map(Number)
                return await movieService.getMoviesByGenres(ids, page)
            }
            if (search) {
                return await movieService.searchMovies(search, page)
            }
            return await movieService.getMovies(page)
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Unknown search result'
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadMovies.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loadMovies.fulfilled, (state, action) => {
                state.isLoading = false
                state.movies = action.payload.results
                state.totalPages = Math.min(action.payload.total_pages, 500)
            })
            .addCase(loadMovies.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Something wrong'
            })
    }
})

export const moviesReducer = moviesSlice.reducer
