import React from 'react'
import styles from './Input.module.scss'

const Input = React.forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement>
>(({ ...props }, ref) => {
  return <input ref={ref} className={styles.input} {...props} />
})

export default Input
