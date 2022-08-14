import styles from './ButtonClear.module.scss'

import ClearBtn from '../../../assets/svg/clearButton.svg'

interface IButtonClearProps {
  onClick?: React.MouseEventHandler<HTMLElement>
}

const ButtonClear: React.FC<IButtonClearProps> = ({ ...props }) => {
  return (
    <img
      src={ClearBtn}
      alt=''
      {...props}
      onClick={props.onClick}
      className={styles.buttonClear}
    />
  )
}

export default ButtonClear
