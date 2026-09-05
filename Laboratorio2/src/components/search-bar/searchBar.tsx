import styles from './SearchBar.module.css';


interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}


export default function SearchBar({ value, onChange, onSearch }: SearchBarProps) {

    // Permite buscar también con la tecla Enter
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter') {
            onSearch();
        }

    };


    return (

        <div className={styles.searchBar}>

            <div className={styles.searchGroup}>

                <input
                    type="text"
                    placeholder="Are you looking for something specific?"
                    className={styles.searchInput}
                    aria-label="Buscar productos"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button
                    type="button"
                    className={styles.searchButton}
                    onClick={onSearch}
                >
                    Search
                </button>

            </div>

        </div>

    );
}