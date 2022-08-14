import styles from './CardList.module.scss'
import CardBlock from './../CardBlock/index'
import { v4 } from 'uuid'
import { useRef, useState } from 'react'

import ClearBtn from '../../assets/svg/clearButton.svg'

const CardList = () => {
  const DEFAULT_LIST: CardItem[] = [
    {
      id: v4(),
      title: 'First Title',
      tasks: [
        {
          id: v4(),
          title: '1',
        },
      ],
    },
  ]
  const inputRef = useRef<HTMLInputElement>(null)

  const [isCreated, setIsCreated] = useState(false)
  const [cardList, setCardList] = useState(DEFAULT_LIST)
  const [value, setValue] = useState('')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div className={styles.cardList}>
      {cardList.map((value, index) => (
        <div key={value.id}>{value.title}</div>
      ))}

      <div
        className={styles.cardList__create_btn}
        onClick={() => setIsCreated(true)}>
        {isCreated ? (
          <div className={styles.cardList__wrapper}>
            <input
              ref={inputRef}
              className={styles.cardList__input}
              type='text'
              onChange={onChangeInput}
              value={value}
            />
            <div className={styles.cardList__buttons}>
              <button className={styles.cardList__btn_add}>Added list</button>
              <img
                className={styles.cardList__btn_clear}
                src={ClearBtn}
                alt=''
                onClick={(e) => {
                  e.stopPropagation()
                  setIsCreated(false)
                }}
              />
            </div>
          </div>
        ) : (
          <div>+ Add a list</div>
        )}
      </div>
    </div>
  )
}

export default CardList
