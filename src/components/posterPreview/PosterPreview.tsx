import type {FC} from "react";
import styles from './PosterPreview.module.css'
import {posterBaseUrl} from "../../constants/constants.ts";

type PosterPreviewProps = {
    posterPath: string | null,
    title: string
}

const PosterPreview: FC<PosterPreviewProps> = ({posterPath, title}) => {
    if (!posterPath) {
        return <div className={styles.noPoster}>No poster available</div>
    }
    return (
        <img className={styles.poster} src={`${posterBaseUrl}${posterPath}`} alt={title}></img>
    )
}

export default PosterPreview;
