import type {IGenre} from "../../models/IGenre.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService} from "../../services/api.service.ts";

type GenresState = {
    genres: IGenre[],
    isLoading: boolean,
    error: string | null
}

const initialState: GenresState = {
    genres: [],
    isLoading: false,
    error: null
}

export const loadGenres = createAsyncThunk<IGenre[], void, {rejectValue: string}>(
    'genres/loadGenres',
    async (_, thunkAPI) => {
        try {
            return await movieService.getGenres()
        } catch (e) {
            const message = e instanceof Error ? e.message : 'error'
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const genreSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadGenres.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(loadGenres.fulfilled, (state, action) => {
                state.isLoading = false
                state.genres = action.payload
            })
            .addCase(loadGenres.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'Something wrong'
            })
    }
})

export const genresReducer = genreSlice.reducer
