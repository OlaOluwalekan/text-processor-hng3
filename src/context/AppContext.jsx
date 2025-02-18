import { createContext, ReactNode, useContext, useState } from 'react'

const AppContext = createContext(undefined)

export const AppProvider = ({ children }) => {
  const [messages, setMessages] = useState([])
  const [trans, setTrans] = useState({
    translation: false,
    summarization: false,
  })

  return (
    <AppContext.Provider
      value={{
        messages,
        setMessages,
        trans,
        setTrans,
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
