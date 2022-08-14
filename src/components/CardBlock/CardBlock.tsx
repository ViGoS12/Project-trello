import styles from './CardBlock.module.scss'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import Card from './../Card/'
import ButtonAdd from './../UI/ButtonAdd/'
import ButtonClear from '../UI/ButtonClear'
import { useRef, useState } from 'react'
import Input from '../UI/Input'
import classNames from 'classnames'

const CardBlock: React.FC<CardItem> = ({ id, title, tasks }) => {
  const [tasksList, setTaskslist] = useState(tasks)
  const [value, setValue] = useState('')
  const [isCreated, setIsCreated] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  console.log(tasksList)

  const addTask = () => {
    if (value.length !== 0) {
      //  cardList.length > 0
      //    ? setCardList([...cardList, { id: v4(), title: value }])
      //    : setCardList([{ id: v4(), title: value }])
      //  setValue('')
      //  setIsCreated(false)
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (source.droppableId !== destination?.droppableId) {
      // const sourceIndex = DefaultData.findIndex(
      //   (e) => e.id === source.droppableId
      // )
      // if (destination) {
      //   const destinationIndex = DefaultData.findIndex(
      //     (e) => e.id === destination.droppableId
      //   )
      //   const sourceCol = DefaultData[sourceIndex]
      //   const destinationCol = DefaultData[destinationIndex]
      //   const destinationTask = [...destinationCol.tasks]
      //   const sourceTask = [...sourceCol.tasks]
      //   const [removed] = sourceTask.splice(source.index, 1)
      //   if (destination) {
      //     destinationTask.splice(destination.index, 0, removed)
      //   }
      //   DefaultData[sourceIndex].tasks = sourceTask
      //   DefaultData[destinationIndex].tasks = destinationTask
      //   setData(DefaultData)
      // }
    } else {
      const sourceIndex = source.droppableId
      console.log(sourceIndex)
    }
  }
  return (
    <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
      <div className={styles.cardBlock}>
        <Droppable key={id} droppableId={id}>
          {(provided) => (
            <div
              className={styles.cardBlock__item}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              <div className={styles.cardBlock__title}>{title}</div>
              <div className={styles.cardBlock__content}>
                {tasks &&
                  tasks.map((task, index) => (
                    <Draggable
                      draggableId={task.id}
                      index={index}
                      key={task.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? '0.5' : '1',
                          }}>
                          <Card>{task.title}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
            </div>
          )}
        </Droppable>
        {isCreated ? (
          <div className={styles.cardBlock__footer}>
            <Input
              ref={inputRef}
              type='text'
              onChange={onChangeInput}
              value={value}
            />

            <div className={styles.cardBlock__buttons}>
              <ButtonAdd onClick={addTask}>Add card</ButtonAdd>
              <ButtonClear />
            </div>
          </div>
        ) : (
          <div className={classNames(styles.cardBlock__footer)}>
            <button
              className={styles.cardBlock__create_btn}
              onClick={() => setIsCreated(true)}>
              Add card
            </button>
          </div>
        )}
      </div>
    </DragDropContext>
  )
}

export default CardBlock
