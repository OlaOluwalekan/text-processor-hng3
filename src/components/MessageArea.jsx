import { useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import Message from './Message'

const MessageArea = () => {
  const { messages } = useAppContext()
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <div
      className='flex flex-col grow w-full mx-auto h-full overflow-auto'
      role='log' // Indicates this region contains a live log of messages.
      aria-live='polite' // Announces new messages as they arrive.
      aria-label='Message history'
      tabIndex='0' // Allows keyboard users to focus the message area.
    >
      {messages.length === 0 ? (
        <div className='w-full h-full flex justify-center items-center'>
          No messages yet
        </div>
      ) : (
        <div className='w-[90%] max-w-[900px] mx-auto h-full flex flex-col items-end gap-2 py-2'>
          {messages.map((message) => {
            return <Message key={message.id} {...message} />
          })}
          <div ref={bottomRef}></div>
        </div>
      )}
    </div>
  )
}

export default MessageArea
