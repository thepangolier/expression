import { tool } from 'ai'
import { z } from 'zod'

export default tool({
  description:
    'The carousel tool, use this when the user wants to create a carousel of images',
  parameters: z.object({
    items: z
      .number()
      .default(5)
      .describe('The number of images to generate for the carousel')
  }),
  async execute({ items }) {
    return items
  }
})
