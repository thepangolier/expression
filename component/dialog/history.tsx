import type { Message } from 'ai'
import { useCallback, useEffect, useState } from 'react'
import { getThreads, type Thread } from '@ai/action/thread'
import MessageComponent from '@component/prompt/message'
import Dialog from '@component/shared/dialog'
import { IconExit, IconSearch, IconSpinner } from '@component/shared/icon'

export interface HistoryDialogProps {
  active: boolean
  setActive(v: boolean): void
  setMessages(v: Message[]): void
}

export default function HistoryDialog({
  active,
  setActive,
  setMessages
}: HistoryDialogProps) {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [threads, setThreads] = useState<Thread[]>([])
  const [preview, setPreview] = useState<Thread | null>(null)

  useEffect(() => {
    setLoading(true)
    async function retrieveThreads() {
      setThreads(await getThreads())
      setLoading(false)
    }

    if (active) {
      retrieveThreads()
    }
  }, [active])

  useEffect(() => {
    if (threads.length > 0) {
      setPreview(threads[0])
    }
  }, [threads])

  const getFirstMessage = useCallback((thread: Thread) => {
    const { content, createdAt } = thread.messages[0]
    return (
      <>
        {createdAt && (
          <span className="message-date">
            {new Date(createdAt).toLocaleString()}
          </span>
        )}
        <span className="message-content">{content}</span>
      </>
    )
  }, [])

  return (
    <Dialog active={active} setActive={setActive} className="dialog-history">
      <div className="dialog-search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconSearch />
      </div>
      <button className="exit mobile-exit" onClick={() => setActive(false)}>
        <IconExit />
      </button>
      <div className="dialog-content-wrapper dialog-content-history">
        <div
          className="dialog-loader"
          style={{
            opacity: loading ? 1 : 0
          }}
        >
          <IconSpinner />
        </div>

        <div className="dialog-content-column">
          {threads
            .filter((thread) => {
              if (search) {
                const { content } = thread.messages[0]
                return content.toLowerCase().includes(search)
              } else {
                return true
              }
            })
            .map((thread) => (
              <button
                className={
                  thread.path === preview?.path
                    ? 'button-history active'
                    : 'button-history inactive'
                }
                key={thread.path}
                onMouseEnter={() => setPreview(thread)}
                onClick={() => {
                  setMessages(thread.messages)
                  setActive(false)
                }}
              >
                {getFirstMessage(thread)}
              </button>
            ))}
        </div>

        <div className="dialog-history-preview">
          {preview?.messages.map((message) => (
            <MessageComponent key={message.id} message={message} />
          ))}
        </div>
      </div>
    </Dialog>
  )
}
