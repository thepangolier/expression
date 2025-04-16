import type { Message, UIMessage } from 'ai'
import Markdown from 'react-markdown'
import GFM from 'remark-gfm'
import { ToolLabel, ToolResult } from '@component/prompt/tool'
import { IconSpinner } from '@component/shared/icon'

export interface MessageProps {
  message: UIMessage | Message
}

export default function Message({ message }: MessageProps) {
  return (
    <div className={`message ${message.role}`} data-id={message.id}>
      {message.parts ? (
        message.parts.map((part) => {
          switch (part.type) {
            case 'text':
              return (
                <Markdown remarkPlugins={[GFM]} key={`part-${message.id}`}>
                  {part.text}
                </Markdown>
              )
            case 'tool-invocation':
              return (
                <div
                  className="tool-invocation"
                  key={part.toolInvocation.toolCallId}
                >
                  <ToolLabel
                    name={part.toolInvocation.toolName}
                    args={part.toolInvocation.args}
                  />
                  {part.toolInvocation.state === 'result' ? (
                    <div className="tool-invocation-result">
                      <ToolResult
                        name={part.toolInvocation.toolName}
                        result={part.toolInvocation.result}
                      />
                    </div>
                  ) : (
                    <div className="tool-invocation-loader">
                      <IconSpinner />
                    </div>
                  )}
                </div>
              )
          }
        })
      ) : (
        <Markdown remarkPlugins={[GFM]}>{message.content}</Markdown>
      )}
    </div>
  )
}
