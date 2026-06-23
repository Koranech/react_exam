import type {FC} from "react";
import styles from './StarsRating.module.css'

type StarsRatingProps = {
    rating: number;
}

const StarsRating: FC<StarsRatingProps> = ({rating}) => {
    const stars: number = Math.round(rating)
    const starsArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div className={styles.starRating}>
            {
                starsArr.map(star => (
                    <span key={star} className={star <= stars ? styles.starSelected : styles.star}>
                   ★
               </span>
                ))
            }
        </div>
    );
};

export default StarsRating;
