import { tool } from 'ai'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { z } from 'zod'

export function getFile(language: 'python' | 'typescript') {
  switch (language) {
    case 'python':
      return readFileSync(
        join(process.cwd(), 'ai', 'tool', 'code', 'example.py'),
        'utf-8'
      )
    default:
      return readFileSync(
        join(process.cwd(), 'ai', 'tool', 'code', 'example.ts'),
        'utf-8'
      )
  }
}

export default tool({
  description: 'The code tool, use this when the user wants to generate code',
  parameters: z.object({
    language: z
      .enum(['python', 'typescript'])
      .default('typescript')
      .describe('The language to generate code for')
  }),
  async execute({ language }) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return `\`\`\`${language}\n${getFile(language)}\n\`\`\``
  }
})
