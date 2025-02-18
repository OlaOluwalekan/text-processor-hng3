import { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useAppContext } from '../context/AppContext'
import { v4 as uniqueId } from 'uuid'
import notification from '../assets/notification.mp3'

const InputForm = () => {
  const [text, setText] = useState('')
  const { messages, setMessages } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (text) {
      const id = uniqueId()
      setMessages([...messages, { content: text, id }])
      setText('')
    }
    const sound = new Audio(notification)
    sound.play()
  }

  return (
    <form
      className='flex justify-center items-center relative w-[90%] max-w-[600px] mx-auto border-2 rounded-lg mb-2 border-teal-600'
      onSubmit={handleSubmit}
    >
      <textarea
        name='text'
        id='text'
        placeholder='Your text here...'
        className='textarea textarea-bordered bg-black/10 resize-none w-full border-none pr-7 h-auto placeholder:text-gray-700 font-semibold'
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      {text && (
        <button
          type='submit'
          className='text-3xl absolute right-2 bottom-1 text-teal-800'
        >
          <IoSend />
        </button>
      )}
    </form>
  )
}

export default InputForm
