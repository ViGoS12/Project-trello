import { useEffect, useRef, useState } from 'react'

import styles from './CardList.module.scss'

import { v4 } from 'uuid'

import { DropResult } from 'react-beautiful-dnd'

import CardBlock from './../CardBlock/index'
import ButtonAdd from '../UI/ButtonAdd'
import ButtonClear from '../UI/ButtonClear'
import Input from '../UI/Input'

const def = [
  {
    id: v4(),
    title: 'Second Title',
    tasks: [
      {
        id: v4(),
        title: '123131223123',
      },
      {
        id: v4(),
        title: '234',
      },
    ],
  },
  {
    id: v4(),
    title: 'Third Title',
    tasks: [
      {
        id: v4(),
        title: '123',
      },
      {
        id: v4(),
        title: '234',
      },
    ],
  },
]

const CardList: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isCreated, setIsCreated] = useState(false)
  const [cardList, setCardList] = useState<CardItem[]>(def)

  const [value, setValue] = useState('')

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const addCardBlock = () => {
    if (value.length !== 0) {
      cardList.length > 0
        ? setCardList([...cardList, { id: v4(), title: value, tasks: [] }])
        : setCardList([{ id: v4(), title: value, tasks: [] }])
      setValue('')
      setIsCreated(false)
    }
  }

  const addTaskItem = (id: CardItem['id'], value: string) => {
    setCardList(
      cardList.map((card) => {
        return card.id === id
          ? { ...card, tasks: [...card.tasks, { id: v4(), title: value }] }
          : card
      })
    )
  }
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) {
      return
    }
    const sourceIndex = cardList.findIndex((e) => e.id === source.droppableId)
    const sourceCol = cardList[sourceIndex]
    const sourceTask = [...sourceCol.tasks]

    const [removed] = sourceTask.splice(source.index, 1)
    sourceTask.splice(destination.index, 0, removed)
    cardList[sourceIndex].tasks = sourceTask

    setCardList([...cardList])

    console.log(cardList)
  }

  return (
    <div className={styles.cardList}>
      {cardList.map((cardItem) => (
        <CardBlock
          key={cardItem.id}
          {...cardItem}
          addTaskItem={addTaskItem}
          onDragEnd={onDragEnd}
        />
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
