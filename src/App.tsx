import './scss/app.scss'
import Header from './components/header/'
import Main from './components/main/'

function App() {
  return (
    <div className='app'>
      <Header />
      <div className='app__container'>
        <Main />
      </div>
    </div>
  )
}

export default App
