import {useEffect, useState} from "react";
import type {IGenre} from "../../models/IGenre.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {movieService} from "../../services/api.service.ts";
import styles from './Genre.module.css'
import MoviesList from "../moviesList/MoviesList.tsx";

const Genre = () => {

    const [genres, setGenres] = useState<IGenre[]>([])
    const [selectedGenres, setSelectedGenres] = useState<number[]>([])

    const [searсhParams] = useSearchParams()
    const genreIds = searсhParams.get('ids')

    useEffect(() => {
        movieService.getGenres()
            .then(genres => setGenres(genres))
    }, []);

    const toggleGenre = (id: number) => {
        setSelectedGenres(genreArr =>
            genreArr.includes(id) ? genreArr.filter(genreId => genreId !== id) : [...genreArr, id]
        )
    }
    const navigate = useNavigate()

    const handleFind = () => {
        if (selectedGenres.length > 0) {
            navigate(`/genres?ids=${selectedGenres.join(',')}&page=1`)
        }
    }

    return (
        <div>
            <div className={styles.genresList}>
                {genres.map(genre => (
                    <span
                        key={genre.id}
                        onClick={() => toggleGenre(genre.id)}
                        className={selectedGenres.includes(genre.id) ? styles.genreSelected : styles.genre}>
                        {genre.name}
                    </span>
                ))}
            </div>

            {selectedGenres.length > 0 &&
                <button className={styles.findButton} onClick={handleFind}>Find</button>
            }
            {genreIds && <MoviesList genreIds={genreIds}/>}
        </div>
    );
};

export default Genre;
