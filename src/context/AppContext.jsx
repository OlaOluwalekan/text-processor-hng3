import { createContext, ReactNode, useContext, useState } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [textRef, setTextRef] = useState(null)

  return (
    <AppContext.Provider
      value={{
        messages,
        setMessages,
        textRef,
        setTextRef,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }

  return context
}
