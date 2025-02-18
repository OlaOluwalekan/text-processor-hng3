import './App.css'
import InputForm from './components/InputForm'
import MessageArea from './components/MessageArea'

const App = () => {
  return (
    <div className='w-screen h-screen text-black relative overflow-hidden'>
      <div className='w-full h-full bg-doodles bg-cover opacity-10'></div>
      <div className='flex flex-col bg-teal-100/50 w-full h-full gap-2 absolute top-0 left-0'>
        <MessageArea />
        <InputForm />
      </div>
    </div>
  )
}

export default App
