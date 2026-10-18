import {type FC} from "react";
import type {IMovie} from "../../models/IMovie.ts";
import styles from './MoviesListCard.module.css'
import PosterPreview from "../posterPreview/PosterPreview.tsx";
import MovieInfo from "../movieInfo/MovieInfo.tsx";

type MovieTypeProps = {
    movie: IMovie
}

const MoviesListCard: FC<MovieTypeProps> = ({movie}) => {

    return (
        <div className={styles.detailsContainer}>
            <PosterPreview posterPath={movie.poster_path} title={movie.title}/>
            <MovieInfo movie={movie}/>
        </div>
    );
};


export default MoviesListCard;
