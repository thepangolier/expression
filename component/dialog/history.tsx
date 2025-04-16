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
    let cancelled = false

    const retrieveThreads = async (): Promise<void> => {
      setLoading(true)
      const data = await getThreads()
      if (!cancelled) {
        setThreads(data)
        setPreview(data[0] ?? null)
        setLoading(false)
      }
    }

    if (active) retrieveThreads()

    return () => {
      cancelled = true
    }
  }, [active])

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
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <IconSearch />
      </div>

      <button className="exit mobile-exit" onClick={() => setActive(false)}>
        <IconExit />
      </button>

      <div className="dialog-content-wrapper dialog-content-history">
        <div className="dialog-loader" style={{ opacity: loading ? 1 : 0 }}>
          <IconSpinner />
        </div>

        <div className="dialog-content-column">
          {threads
            .filter(({ messages }) =>
              search ? messages[0].content.toLowerCase().includes(search) : true
            )
            .map((thread) => (
              <button
                key={thread.path}
                className={
                  thread.path === preview?.path
                    ? 'button-history active'
                    : 'button-history inactive'
                }
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
          {preview?.messages.map((m) => (
            <MessageComponent key={m.id} message={m} />
          ))}
        </div>
      </div>
    </Dialog>
  )
}
