import './App.css'
import InputForm from './components/InputForm'
import MessageArea from './components/MessageArea'

const App = () => {
  return (
    <div className='w-screen h-screen max-h-screen text-black relative bg-red-400 overflow-hidden'>
      <div className='w-full h-full bg-doodles bg-cover opacity-10'></div>
      <div className='flex flex-col bg-teal-100/60 w-full h-full gap-2 fixed top-0 left-0 z-20'>
        <MessageArea />
        <InputForm />
      </div>
    </div>
  )
}

export default App
