import { useEffect, useRef, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useAppContext } from '../context/AppContext'
import { v4 as uniqueId } from 'uuid'
import notification from '../assets/notification.mp3'

const InputForm = () => {
  const [text, setText] = useState('')
  const { messages, setMessages, setTextRef } = useAppContext()
  const inputRef = useRef(null)

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

  useEffect(() => {
    setTextRef(inputRef)
    if (inputRef.current) {
      inputRef.current?.focus()
    }
  }, [messages])

  return (
    <form
      className='flex justify-center items-center relative w-[90%] max-w-[600px] mx-auto border-2 rounded-lg mb-2 border-teal-600'
      onSubmit={handleSubmit}
      aria-label='Message input form'
    >
      <textarea
        name='text'
        id='text'
        placeholder='Your text here...'
        className='textarea textarea-bordered bg-white/20 resize-none w-full border-none pr-7 h-auto placeholder:text-gray-700 font-semibold field-sizing-content max-h-[150px]'
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label='Type your message here'
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
        ref={inputRef}
      ></textarea>

      <article
        className='absolute top-2 right-2 text-xs bg-green-700/50 text-white px-2 py-0.5 rounded'
        aria-live='polite'
        aria-atomic='true'
      >
        <span>{text.length}</span> characters
      </article>

      {text && (
        <button
          type='submit'
          className='text-3xl absolute right-2 bottom-1 text-teal-800'
          aria-label='Send message'
        >
          <IoSend />
        </button>
      )}
    </form>
  )
}

export default InputForm
