import styles from './Header.module.scss'
import Logo from '../../assets/svg/logo.svg'

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={Logo} alt='' className={styles.header__img} />
      Project Trello
    </div>
  )
}

export default Header
