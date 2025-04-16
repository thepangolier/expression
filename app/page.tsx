'use client'
import { generateId } from 'ai'
import { useCallback, useState } from 'react'
import { saveThread } from '@ai/action/thread'
import { useChat } from '@ai-sdk/react'
import HistoryDialog from '@component/dialog/history'
import ProfileDialog from '@component/dialog/profile'
import Header from '@component/header'
import PromptBar from '@component/prompt/bar'
import Message from '@component/prompt/message'
import Title from '@component/title'

export default function RootPage() {
  const [historyDialog, setHistoryDialog] = useState(false)
  const [profileDialog, setProfileDialog] = useState(false)
  const [threadId, setThreadId] = useState(`thread-${generateId()}`)

  const {
    messages,
    setMessages,
    status,
    error,
    input,
    handleInputChange,
    handleSubmit
  } = useChat({
    api: '/api/chat',
    async onFinish(message) {
      await saveThread({ threadId, message })
    }
  })

  const resetThread = useCallback(() => {
    setThreadId(`thread-${generateId()}`)
    setMessages([])
  }, [setMessages])

  return (
    <div id="expression" className="container">
      <Header
        thread={messages.length > 0}
        resetThread={resetThread}
        setProfileDialog={setProfileDialog}
        setHistoryDialog={setHistoryDialog}
      />
      <ProfileDialog active={profileDialog} setActive={setProfileDialog} />
      <HistoryDialog
        active={historyDialog}
        setActive={setHistoryDialog}
        setMessages={setMessages}
      />

      <div className="message-container">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <Title visible={messages.length === 0} />
      <PromptBar
        status={status}
        error={error}
        input={input}
        setInputAction={handleInputChange}
        submitAction={async (e) => {
          await saveThread({
            threadId,
            message: {
              id: `msg-${generateId()}`,
              createdAt: new Date(),
              role: 'user',
              content: input
            }
          })
          handleSubmit(e)
        }}
      />
    </div>
  )
}
