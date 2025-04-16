'use server'
import type { Message } from 'ai'
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync
} from 'node:fs'
import { join } from 'node:path'

const historyPath = join(process.cwd(), '.next', 'history')

export interface SaveThreadProps {
  threadId: string
  message: Message
}

/**
 * Appends a message to a thread’s history file, creating the history directory if needed.
 *
 * @param props - Properties for saving the thread message.
 * @param props.threadId - Unique identifier for the thread; used as the filename (`{threadId}.json`).
 * @param props.message - The Message object to append to the thread’s history.
 * @returns Promise that resolves once the message has been written to disk.
 */
export async function saveThread({ threadId, message }: SaveThreadProps) {
  if (!existsSync(historyPath)) {
    mkdirSync(historyPath)
  }

  const threadPath = join(process.cwd(), '.next', 'history', `${threadId}.json`)

  let messages: Message[] = []
  if (existsSync(threadPath)) {
    messages = JSON.parse(readFileSync(threadPath, 'utf-8')) as Message[]
  }

  messages.push(message)
  writeFileSync(threadPath, JSON.stringify(messages, null, 2))
}

export interface Thread {
  path: string
  messages: Message[]
}

/**
 * Loads all saved threads from disk and returns them sorted by most recent message.
 *
 * @returns Promise resolving to an array of Thread objects, each containing:
 *   - path: the filename of the thread (e.g. "thread-123.json")
 *   - messages: the array of Message objects in that thread
 */
export async function getThreads(): Promise<Thread[]> {
  if (!existsSync(historyPath)) {
    return []
  }

  const files = readdirSync(historyPath).filter(
    (file) => file.startsWith('thread-') && file.endsWith('.json')
  )

  const threads: Thread[] = files.map((file) => {
    const fullPath = join(historyPath, file)
    const messages = JSON.parse(readFileSync(fullPath, 'utf-8')) as Message[]
    return { path: file, messages }
  })

  threads.sort((a, b) => {
    const aCreatedAt = new Date(
      a.messages[a.messages.length - 1].createdAt || 0
    ).getTime()
    const bCreatedAt = new Date(
      b.messages[b.messages.length - 1].createdAt || 0
    ).getTime()
    return bCreatedAt - aCreatedAt
  })

  return threads
}
