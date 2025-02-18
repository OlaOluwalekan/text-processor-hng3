import { useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import Message from './Message'

const MessageArea = () => {
  const { messages, trans } = useAppContext()
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, trans])

  return (
    <div className='flex flex-col grow w-full mx-auto h-full overflow-auto'>
      {messages.length === 0 ? (
        <div className='w-full h-full flex justify-center items-center'>
          No messages yet
        </div>
      ) : (
        <div className='w-[90%] max-w-[900px] mx-auto h-full flex flex-col items-end gap-2'>
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
