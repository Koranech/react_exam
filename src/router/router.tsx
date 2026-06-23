import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import MoviesListPage from "../pages/MoviesListPage.tsx";
import MoviesListCardPage from "../pages/MoviesListCardPage.tsx";
import GenrePage from "../pages/GenrePage.tsx";

export const router = createBrowserRouter([
    {path: '/', element: <MainLayout/>, children: [
            {index: true, element: <MoviesListPage/>},
            {path: 'movies/:id', element: <MoviesListCardPage/>},
            {path: 'genres', element: <GenrePage/>}
        ]}
])
