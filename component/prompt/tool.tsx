'use client'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import Markdown from 'react-markdown'
import GFM from 'remark-gfm'
import Logo from '@assets/img/logo.png'
import { IconChevron } from '@component/shared/icon'

export interface ToolLabelProps {
  name: string
  args: {
    language?: string
    items?: number
  }
}

export function ToolLabel({ name, args }: ToolLabelProps) {
  const arg = useMemo(() => {
    switch (name) {
      case 'code':
        return (
          <p>
            Language Selected <span>{args.language}</span>
          </p>
        )
      case 'carousel':
        return (
          <p>
            Carousel Items Generated <span>{args.items}</span>
          </p>
        )
      default:
        return null
    }
  }, [name, args])

  return (
    <div className="tool-invocation-label">
      <p>
        Tool invoked <span>{name}</span>
      </p>
      {arg}
    </div>
  )
}

export interface ToolResultProps {
  name: string
  result: string | number
}

export function ToolResult({ name, result }: ToolResultProps) {
  switch (name) {
    case 'code':
      return <Markdown remarkPlugins={[GFM]}>{result as string}</Markdown>
    case 'carousel':
      return <ToolCarousel size={result as number} />
    default:
      return <p className="tool-error">Failed to render tool result</p>
  }
}

export interface ToolCarouselProps {
  size: number
}

export function ToolCarousel({ size }: ToolCarouselProps) {
  const [position, setPosition] = useState(0)

  return (
    <div className="tool-carousel">
      <div
        className="tool-carousel-wrap"
        style={{
          width: size * 180,
          transform: `translateX(${position * 100}px)`
        }}
      >
        {new Array(size).fill(0).map((_, index) => (
          <div className="tool-carousel-item" key={index}>
            <Image src={Logo} alt="Carousel Item" fill />
          </div>
        ))}
      </div>
      <div className="tool-carousel-options">
        <button onClick={() => setPosition(position - 1)}>
          <IconChevron />
        </button>
        <button onClick={() => setPosition(position + 1)}>
          <IconChevron />
        </button>
      </div>
    </div>
  )
}
