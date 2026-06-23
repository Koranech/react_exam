import {type FC, useEffect, useState} from "react";
import type {IMovie} from "../../models/IMovie.ts";
import {movieService} from "../../services/api.service.ts";
import MovieOnList from "../movieOnList/MovieOnList.tsx";
import styles from './MoviesList.module.css'
import Pagination from "../pagination/Pagination.tsx";
import {useSearchParams} from "react-router-dom";

type MovieListProps = {
    genreIds?: string
}

const MoviesList: FC<MovieListProps> = ({genreIds}) => {

    const [movies, setMovies] = useState<IMovie[]>([])

    const [query, setQuery] = useSearchParams({page: '1'})
    const currentPage: number = Number(query.get('page'));
    const currentQuery = query.get('search') || '';
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
        if (genreIds) {
            const ids = genreIds.split(',').map(Number)
            movieService.getMoviesByGenres(ids, currentPage)
                .then(data => {
                    setMovies(data.results)
                    setTotalPages(Math.min(data.total_pages, 500))
                })
        } else if (currentQuery) {
            movieService.searchMovies(currentQuery, currentPage)
                .then(data => {
                    setMovies(data.results)
                    setTotalPages(Math.min(data.total_pages, 500))
                })
        } else {
            movieService.getMovies(currentPage)
                .then(data => {
                    setMovies(data.results)
                    setTotalPages(Math.min(data.total_pages, 500))
                })
        }
    }, [currentPage, currentQuery, genreIds]);


    const handlePageChange = (page: number) => {
        if (genreIds) {
            setQuery({page: String(page), ids: genreIds})
        } else {
            setQuery({page: String(page), search: currentQuery})
        }
    }

    return (
        <div>
            <div className={styles.moviesGrid}>
                {
                    movies.map(movie => <MovieOnList key={movie.id} movie={movie} currentPage={currentPage}/>)
                }
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>

    );
};

export default MoviesList;
