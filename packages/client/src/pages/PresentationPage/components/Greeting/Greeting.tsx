import styles from './Greeting.module.scss'

export const Greeting = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добро пожаловать в игру Galaxian</h1>
      <p className={styles.paragraph}>
        Чтобы узнать об игре, нажмите любую клавишу
      </p>
    </div>
  )
}
