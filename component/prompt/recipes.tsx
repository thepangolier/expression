export interface RecipeItem {
  name: string
  description: string
  prompt: string
}

export default [
  {
    name: 'Fall of Roman Empire',
    description:
      'Describes the historical events leading to the fall of the Roman Empire',
    prompt: `Write concise bullet points on the fall of the Roman Empire, including key events, figures, and factors that contributed to its decline. Discuss the political, economic, and social aspects of this historical period.`
  },
  {
    name: 'Carousel Tool Call',
    description: 'Creates a simple carousel of images',
    prompt: `Create a carousel of images. Use 10 images for the carousel.`
  },
  {
    name: 'Code Snippet Tool Call',
    description:
      'Generates a code snippet for a specific programming task or function',
    prompt: `Generate a code snippet in Python that calculates the factorial of a number using recursion. Include comments explaining each step of the code.`
  }
] as RecipeItem[]
