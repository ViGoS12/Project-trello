import styles from './CardBlock.module.scss'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import Card from './../Card/'

type Section = {
  id: string
  title: string
  tasks: {
    id: string
    title: string
  }[]
}[]

interface ICardBlockProps {
  DefaultData: Section
  setData: (DefaultData: Section) => void
}

const CardBlock: React.FC<ICardBlockProps> = ({ DefaultData, setData }) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (source.droppableId !== destination?.droppableId) {
      const sourceIndex = DefaultData.findIndex(
        (e) => e.id === source.droppableId
      )
      if (destination) {
        const destinationIndex = DefaultData.findIndex(
          (e) => e.id === destination.droppableId
        )
        const sourceCol = DefaultData[sourceIndex]
        const destinationCol = DefaultData[destinationIndex]
        const destinationTask = [...destinationCol.tasks]
        const sourceTask = [...sourceCol.tasks]
        const [removed] = sourceTask.splice(source.index, 1)

        if (destination) {
          destinationTask.splice(destination.index, 0, removed)
        }
        DefaultData[sourceIndex].tasks = sourceTask
        DefaultData[destinationIndex].tasks = destinationTask
        setData(DefaultData)
      }
    } else {
      const sourceIndex = DefaultData.findIndex(
        (e) => e.id === source.droppableId
      )
      const sourceCol = DefaultData[sourceIndex]
      const sourceTask = [...sourceCol.tasks]
      const [removed] = sourceTask.splice(source.index, 1)

      if (destination) {
        sourceTask.splice(destination.index, 0, removed)
      }
      DefaultData[sourceIndex].tasks = sourceTask
      setData(DefaultData)
    }
  }
  return (
    <DragDropContext onDragEnd={(res) => onDragEnd(res)}>
      <div className={styles.cardBlock}>
        {DefaultData.map((item) => (
          <Droppable key={item.id} droppableId={item.id}>
            {(provided) => (
              <div
                className={styles.cardBlock__item}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                <div className={styles.cardBlock__title}>{item.title}</div>
                <div className={styles.cardBlock__content}>
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

export default CardBlock
