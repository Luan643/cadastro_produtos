import styles from './styles.module.scss'

export function Container({children}: any) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}