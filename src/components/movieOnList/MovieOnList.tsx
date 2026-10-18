import type {FC} from "react";
import type {IMovie} from "../../models/IMovie.ts";
import styles from './MovieOnList.module.css'
import {Link} from "react-router-dom";
import {posterBaseUrl} from "../../constants/constants.ts";

type MovieTypeProps = {
    movie: IMovie,
    currentPage: number
}

const MovieOnList: FC<MovieTypeProps> = ({movie, currentPage}) => {
    return (
        <Link to={`/movies/${movie.id}`} state={{fromPage: currentPage}} className={styles.card}>
            {movie.poster_path
                ? <img className={styles.poster} src={`${posterBaseUrl}${movie.poster_path}`} alt={movie.title}/>
                : <h3 className={styles.title}>Movie name: {movie.title}</h3>
            }
        </Link>
    );
};

export default MovieOnList;
