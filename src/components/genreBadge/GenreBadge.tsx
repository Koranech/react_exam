import type {FC} from "react";
import styles from './GenreBadge.module.css'
type GenreBadgeProps = {
    name: string;
}
const GenreBadge: FC<GenreBadgeProps> = ({name}) => {
    return (
        <span className={styles.badge}>{name}</span>
    );
};

export default GenreBadge;
