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
        title:
          '123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123',
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

const Main: React.FC = () => {
  const [data, setData] = useState(STARTDATA)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (source.droppableId !== destination?.droppableId) {
      const sourceIndex = data.findIndex((e) => e.id === source.droppableId)
      if (destination) {
        const destinationIndex = data.findIndex(
          (e) => e.id === destination.droppableId
        )
        const sourceCol = data[sourceIndex]
        const destinationCol = data[destinationIndex]
        const destinationTask = [...destinationCol.tasks]
        const sourceTask = [...sourceCol.tasks]
        const [removed] = sourceTask.splice(source.index, 1)

        if (destination) {
          destinationTask.splice(destination.index, 0, removed)
        }
        data[sourceIndex].tasks = sourceTask
        data[destinationIndex].tasks = destinationTask
        setData(data)
      }
    } else {
      const sourceIndex = data.findIndex((e) => e.id === source.droppableId)
      const sourceCol = data[sourceIndex]
      const sourceTask = [...sourceCol.tasks]
      const [removed] = sourceTask.splice(source.index, 1)

      if (destination) {
        sourceTask.splice(destination.index, 0, removed)
      }
      data[sourceIndex].tasks = sourceTask
      setData(data)
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
                          <Card>{task.title}</Card>
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
