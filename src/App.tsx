import './scss/app.scss'

import Header from './components/header/'
import CardList from './components/CardList/'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='app__container'>
        <CardList />
      </div>
    </div>
  )
}

export default App
