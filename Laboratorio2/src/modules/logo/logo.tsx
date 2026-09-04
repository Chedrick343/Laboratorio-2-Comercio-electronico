import styles from '../../styles/Logo.module.css';

export default function Logo() {
    return (
        <div className={styles.logoContainer}>
            <h1 className={styles.logo}>POST</h1>
        </div>
    );
}