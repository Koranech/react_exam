import MoviesListCard from "../components/moviesListCard/MoviesListCard.tsx";
import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect} from "react";
import styles from '../components/moviesListCard/MoviesListCard.module.css'
import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {clearMovie, loadMovieById} from "../redux/slices/movieSlice.ts";

const MoviesListCardPage = () => {

    const {id} = useParams<{ id: string }>()
    const dispatch = useAppDispatch()
    const {movie, isLoading, error} = useAppSelector(state => state.movie)

    const location = useLocation()
    const fromPage = location.state?.fromPage || 1

    useEffect(() => {
        if (id) {
           dispatch(loadMovieById(Number(id)))
        }
        return () => {
            dispatch(clearMovie())
        }
    }, [id, dispatch]);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
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
