import './scss/app.scss'
import Header from './components/header/'
import Main from './components/main/'
import CardList from './components/CardList/'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='app__container'>
        <CardList />
        {/* <Main /> */}
      </div>
    </div>
  )
}

export default App
