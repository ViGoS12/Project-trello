import styles from './CardList.module.scss'
import CardBlock from './../CardBlock/index'
import { v4 } from 'uuid'
import { useRef, useState } from 'react'

import ButtonAdd from '../UI/ButtonAdd'
import ButtonClear from '../UI/ButtonClear'
import Input from '../UI/Input'

const CardList = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isCreated, setIsCreated] = useState(false)
  const [cardList, setCardList] = useState<CardItem[]>([])
  const [value, setValue] = useState('')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const addCardBlock = () => {
    if (value.length !== 0) {
      cardList.length > 0
        ? setCardList([...cardList, { id: v4(), title: value }])
        : setCardList([{ id: v4(), title: value }])
      setValue('')
      setIsCreated(false)
    }
  }

  console.log(cardList)

  return (
    <div className={styles.cardList}>
      {cardList.map((cardItem) => (
        <CardBlock key={cardItem.id} {...cardItem} />
      ))}
      <div
        className={styles.cardList__create_btn}
        onClick={() => {
          setIsCreated(true)
        }}>
        {isCreated ? (
          <div className={styles.cardList__wrapper}>
            <Input
              ref={inputRef}
              type='text'
              onChange={onChangeInput}
              value={value}
            />
            <div className={styles.cardList__buttons}>
              <ButtonAdd
                onClick={(e) => {
                  addCardBlock()
                  e.stopPropagation()
                }}>
                Add a list
              </ButtonAdd>
              <ButtonClear
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
