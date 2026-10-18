import type {IMovie} from "../../models/IMovie.ts";
import type {FC} from "react";
import styles from './MovieInfo.module.css'
import StarsRating from "../starsRating/StarsRating.tsx";
import GenreBadge from "../genreBadge/GenreBadge.tsx";

type MovieInfoProps = {
    movie: IMovie
}

const MovieInfo: FC<MovieInfoProps> = ({movie}) => {
    return (
        <div className={styles.info}>
            <h1 className={styles.title}>{movie.title}</h1>

            <div className={styles.stats}>
                <StarsRating rating={movie.vote_average}/>
                <span className={styles.releaseDate}>Release Date: {movie.release_date}</span>
            </div>

            <div className={styles.genres}>
                {
                    movie.genres?.map(genre => <GenreBadge key={genre.id} name={genre.name}/>)
                }
            </div>

            <h2>Overview</h2>
            <p className={styles.overview}>{movie.overview}</p>
        </div>
    )
}

export default MovieInfo;
