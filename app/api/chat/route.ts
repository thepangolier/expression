import { type CoreMessage, smoothStream, streamText } from 'ai'
import { getProfile } from '@ai/action/profile'
import getProvider from '@ai/provider'
import system from '@ai/system'
import carousel from '@ai/tool/carousel'
import code from '@ai/tool/code'

export const maxDuration = 60

export interface ChatBody {
  messages: CoreMessage[]
}

export async function POST(req: Request) {
  const { messages } = (await req.json()) as ChatBody
  const profile = await getProfile()

  function systemInstructions() {
    if (profile.instructionType === 'custom' && profile.instructions) {
      return profile.instructions
    } else {
      return system
    }
  }

  const result = streamText({
    system: systemInstructions(),
    model: getProvider(),
    tools: {
      carousel,
      code
    },
    messages,
    experimental_transform: smoothStream(),
    onError({ error }) {
      console.error('Chat Stream Error', error)
    }
  })

  return result.toDataStreamResponse()
}
