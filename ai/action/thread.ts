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
