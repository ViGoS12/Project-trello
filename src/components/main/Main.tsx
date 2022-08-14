import CardBlock from './../CardBlock/'
import styles from './Main.module.scss'
import { v4 } from 'uuid'
import { useState } from 'react'

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
        title: '1',
      },
    ],
  },
]

const Main: React.FC = () => {
  const [data, setData] = useState(STARTDATA)

  const onClick = (data: Section) => {
    setData(data)
  }

  return (
    <div className={styles.main}>
      {/* {data.map((dataCard) => (
        <CardBlock key={dataCard.id} DefaultData={data} setData={onClick} />
      ))} */}
    </div>
  )
}

export default Main
