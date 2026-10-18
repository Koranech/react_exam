import {type FC} from "react";
import type {IGenre} from "../../models/IGenre.ts";
import styles from './Genre.module.css'

type GenreProps = {
    genres: IGenre[],
    selectedId: number | null,
    onSelect: (id: number) => void
}

const Genre: FC<GenreProps> = ({genres, selectedId, onSelect}) => {
    return (

        <div className={styles.genresList}>
            {genres.map(genre => (
                <span
                    key={genre.id}
                    onClick={() => onSelect(genre.id)}
                    className={selectedId === genre.id ? styles.genreSelected : styles.genre}>
                        {genre.name}
                    </span>
            ))}
        </div>
    );
};

export default Genre;
