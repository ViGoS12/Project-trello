import { ReactNode } from 'react'
import styles from './Card.module.scss'

interface ICardProps {
  children: ReactNode
}

const Card: React.FC<ICardProps> = ({ children }) => {
  return <div className={styles.card}>{children}</div>
}

export default Card
