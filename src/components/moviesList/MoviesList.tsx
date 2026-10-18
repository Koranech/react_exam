import {type FC} from "react";
import type {IMovie} from "../../models/IMovie.ts";
import MovieOnList from "../movieOnList/MovieOnList.tsx";
import styles from './MoviesList.module.css'


type MovieListProps = {
    movies: IMovie[],
    currentPage: number
}

const MoviesList: FC<MovieListProps> = ({movies, currentPage}) => {


    return (
        <div>
            <div className={styles.moviesGrid}>
                {
                    movies.map(movie => <MovieOnList key={movie.id} movie={movie} currentPage={currentPage}/>)
                }
            </div>
        </div>

    );
};

export default MoviesList;
