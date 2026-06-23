import type {FC} from "react";
import styles from './Pagination.module.css'

type PaginationProps = {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void,
}
const Pagination: FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }
    if (totalPages < 2) return null


    return (
        <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
