import Logo from '../logo/logo';
import SearchBar from '../search-bar/searchBar';

import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <Logo />
            <SearchBar />
        </header>
    );
}