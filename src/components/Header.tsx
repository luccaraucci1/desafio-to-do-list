import styles from './Header.module.css';
import rocket from '../assets/rocket.png'

export function Header(){
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={rocket} alt="Logo to-do list" />
                <span className={styles.to}>to</span>
                <span className={styles.do}>do</span>
            </div>   
        </header>
    );
}