import styles from '../styles.module.scss'
import AccountPage from './components/account'

const Page = async () => {
  return (
    <div className={styles.container}>
      <AccountPage />
    </div>
  )
}

export default Page
