import styles from './Header.module.css'
import UserInfo from "../userInfo/UserInfo.tsx";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";

const Header = () => {

    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate();

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/?page=1&search=${search.trim()}`)
        }
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.leftSide}>
                <UserInfo/>
            </div>
            <nav className={styles.navigation}>
                <NavLink to={'/?page=1'} className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                    Movies
                </NavLink>
                <NavLink to={'/genres'} className={({isActive}) => isActive ? styles.activeLink : styles.link}>
                    Genres
                </NavLink>
            </nav>
            <div className={styles.rightSide}>
                <input
                    type="text"
                    placeholder='Search'
                    className={styles.searchInput}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleEnter}
                />
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>

        </header>
    );
};

export default Header;
