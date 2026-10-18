import {type FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {useSearchParams} from "react-router-dom";
import {loadMovies} from "../redux/slices/moviesSlice.ts";
import Pagination from "../components/pagination/Pagination.tsx";
import MoviesList from "../components/moviesList/MoviesList.tsx";

type MoviesPageProps = {
    genreIds?: string
}

const MoviesPage: FC<MoviesPageProps> = ({ genreIds }) => {

    const dispatch = useAppDispatch()
    const {movies, totalPages, isLoading, error} = useAppSelector(state => state.movies)

    const [query, setQuery] = useSearchParams()
    const currentPage = Number(query.get('page')) || 1
    const currentQuery = query.get('search') || ''

    useEffect(() => {
        dispatch(loadMovies({page: currentPage, search: currentQuery, genreIds}))
    }, [dispatch, currentPage, currentQuery, genreIds]);

    const handlePageChange = (page: number)=> {
        const params: Record<string, string> = {page: String(page)}
        if (genreIds){
            params.ids = genreIds
        } else if (currentQuery){
            params.search = currentQuery
        }
        setQuery(params)
    }

    if (error) return <p>Error: {error}</p>

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            <MoviesList movies={movies} currentPage={currentPage}/>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
    )
}

export default MoviesPage;
