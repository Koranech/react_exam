import {useAppDispatch, useAppSelector} from "../redux/hooks.ts";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {loadGenres} from "../redux/slices/genreSlice.ts";
import Genre from "../components/genre/Genre.tsx";
import MoviesPage from "./MoviesPage.tsx";

const GenresPage = () => {
    const dispatch = useAppDispatch()
    const {genres, isLoading, error} = useAppSelector(state => state.genres)

    const [query, setQuery] = useSearchParams()
    const genreIds = query.get('ids')
    const selectedId = genreIds ? Number(genreIds) : null

    useEffect(() => {
        dispatch(loadGenres())
    }, [dispatch])

    const handleSelect = (id: number) => {
        if (id === selectedId) {
            setQuery({})
        } else {
            setQuery({ids: String(id), page: '1'})
        }
    }
    if (error) return <p>Error:{error}</p>

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            <Genre genres={genres} selectedId={selectedId} onSelect={handleSelect}/>
            {genreIds && <MoviesPage genreIds={genreIds}/>}
        </div>
    )
}

export default GenresPage;
