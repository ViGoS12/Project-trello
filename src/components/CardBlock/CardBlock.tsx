import styles from './CardBlock.module.scss'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Card from './../Card/'
import ButtonAdd from './../UI/ButtonAdd/'
import ButtonClear from '../UI/ButtonClear'
import { useRef, useState } from 'react'
import Input from '../UI/Input'
import classNames from 'classnames'
import useOnClickOutside from './../hooks/useOnClickOutside'

type CardBlockProps = CardItem & {
  addTaskItem: (id: CardItem['id'], value: string) => void
}

const CardBlock: React.FC<CardBlockProps> = ({
  id,
  title,
  tasks,
  addTaskItem,
}) => {
  const [value, setValue] = useState('')
  const [isCreated, setIsCreated] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const footerRef = useRef<HTMLInputElement>(null)

  const addTask = () => {
    if (value.length !== 0) {
      addTaskItem(id, value)
      setValue('')
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  useOnClickOutside(footerRef, () => setIsCreated(false))

  return (
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
                  <Draggable draggableId={task.id} index={index} key={task.id}>
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isCreated ? (
        <div className={styles.cardBlock__footer} ref={footerRef}>
          <Input
            ref={inputRef}
            type='text'
            onChange={onChangeInput}
            value={value}
            onKeyDown={onKeyDown}
          />

          <div className={styles.cardBlock__buttons}>
            <ButtonAdd
              onClick={() => {
                addTask()
              }}>
              Add card
            </ButtonAdd>
            <ButtonClear onClick={() => setIsCreated(false)} />
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
  )
}

export default CardBlock
