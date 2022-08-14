declare module '*.scss' {
  const content: { [key: string]: any }
  export = content
}

declare module '*.svg' {
  const content: any
  export default content
}

type CardItem = {
  id: string
  title: string
  tasks: Card[]
}

type Card = {
  id: string
  title: string
}
