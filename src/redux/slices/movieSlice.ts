import type {IMovie} from "../../models/IMovie.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService} from "../../services/api.service.ts";

type MovieState = {
    movie: IMovie | null,
    isLoading: boolean,
    error: string | null
}

const initialState: MovieState = {
    movie: null,
    isLoading: false,
    error: null
}

export const loadMovieById = createAsyncThunk<IMovie, number, { rejectValue: string }>(
    'movie/loadMovieById',
    async (id, thunkAPI) => {
        try {
            return await movieService.getById(id)
        } catch (e) {
            const message = e instanceof Error ? e.message : 'Error fetching movie'
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        clearMovie: state => {
            state.movie = null
            state.error = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadMovieById.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loadMovieById.fulfilled, (state, action) => {
                state.isLoading = false
                state.movie = action.payload
            })
            .addCase(loadMovieById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Something wrong'
            })
    }
})

export const {clearMovie} = movieSlice.actions
export const movieReducer = movieSlice.reducer
