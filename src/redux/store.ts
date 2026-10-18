import {configureStore} from "@reduxjs/toolkit";
import {moviesReducer} from "./slices/moviesSlice.ts";
import {genresReducer} from "./slices/genreSlice.ts";
import {movieReducer} from "./slices/movieSlice.ts";

//Створено глобальне сховище (store)
export const store = configureStore({
    //Тут знаходяться слайси
    reducer: {
        movies: moviesReducer,
        genres: genresReducer,
        movie: movieReducer
    }
})

export type RootState = ReturnType<typeof store.getState> //Описує форму всього стану
export type AppDispatch = typeof store.dispatch // Описує тип dispatch
