import React, { ReactNode } from 'react'
import styles from './ButtonAdd.module.scss'

interface IButtonAddProps {
  children: ReactNode
  onClick?: React.MouseEventHandler<HTMLElement>
}

const ButtonAdd: React.FC<IButtonAddProps> = ({ children, ...props }) => {
  return (
    <button {...props} onClick={props.onClick} className={styles.buttonAdd}>
      {children}
    </button>
  )
}

export default ButtonAdd
