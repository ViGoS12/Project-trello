import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import styles from './Main.module.scss'
import Card from './../Card/'
import { v4 } from 'uuid'

type Section = {
  id: string
  title: string
  tasks: {
    id: string
    title: string
  }[]
}[]

const STARTDATA: Section = [
  {
    id: v4(),
    title: 'First Title',
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
  {
    id: v4(),
    title: 'Second Title',
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

const Main: React.FC = () => {
  const [data, setData] = useState(STARTDATA)
  console.log()

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
  }
  return (
    <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
      <div className={styles.main__content}>
        {data.map((item) => (
          <Droppable key={item.id} droppableId={item.id}>
            {(provided) => (
              <div
                className={styles.item}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                <div className={styles.item__title}>{item.title}</div>
                <div className={styles.item__content}>
                  {item.tasks.map((task, index) => (
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
                          <Card />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

export default Main
