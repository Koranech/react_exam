import MoviesListCard from "../components/moviesListCard/MoviesListCard.tsx";
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {IMovie} from "../models/IMovie.ts";
import {movieService} from "../services/api.service.ts";
import styles from '../components/moviesListCard/MoviesListCard.module.css'

const MoviesListCardPage = () => {

    const {id} = useParams<{ id: string }>()
    const [movie, setMovie] = useState<IMovie | null>(null)

    const location = useLocation()
    const fromPage = location.state?.fromPage || 1

    useEffect(() => {
        if (id) {
            movieService.getById(Number(id))
                .then(movie => setMovie(movie))
        }
    }, [id]);

    return (
        <>
            {movie && <MoviesListCard movie={movie}/>}
            <div className={styles.backButtonContainer}>
                <Link to={`/?page=${fromPage}`} className={styles.backButton}>
                    Back to list
                </Link>
            </div>
        </>
    );
};

export default MoviesListCardPage;
