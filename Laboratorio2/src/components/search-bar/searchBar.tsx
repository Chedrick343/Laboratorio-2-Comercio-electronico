import styles from './SearchBar.module.css';

export default function SearchBar() {
    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="Are you looking for something specific?"
                className={styles.searchInput}
                aria-label="Buscar productos"
            />
        </div>
    );
}