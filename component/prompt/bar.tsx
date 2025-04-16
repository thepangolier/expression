'use client'
import dynamic from 'next/dynamic'
import { Suspense, useRef, useState } from 'react'
import recipes, { type RecipeItem } from '@component/prompt/recipes'
import { type EditorHandle, type EditorProps } from '@component/shared/editor'
import { IconBook, IconSend, IconSpinner } from '@component/shared/icon'

const Editor = dynamic<EditorProps>(() => import('@component/shared/editor'), {
  ssr: false
})

export interface PromptBarProps {
  status: 'submitted' | 'streaming' | 'ready' | 'error'
  error: Error | undefined
  input: string
  onSubmit: (v: string) => Promise<void>
}

export default function PromptBar({
  status,
  error,
  input,
  onSubmit
}: PromptBarProps) {
  const editorRef = useRef<EditorHandle | null>(null)
  const [recipe, setRecipe] = useState(false)
  const [hoveredRecipe, setHoveredRecipe] = useState<RecipeItem | null>(null)

  return (
    <div id="prompt">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setRecipe(false)
          if (!editorRef.current) return
          const value = await editorRef.current.getValue()
          if (!value) return
          onSubmit(value)
          editorRef.current?.reset()
        }}
        className={status}
      >
        <div
          className="prompt-loading"
          style={{ height: status !== 'ready' ? 60 : 0 }}
        >
          <IconSpinner />
        </div>
        <Suspense>
          <Editor
            value={input}
            onReady={(editor) => (editorRef.current = editor)}
          />
          <button
            className="button-select"
            type="button"
            onClick={() => setRecipe(!recipe)}
          >
            <IconBook />
            Use Recipe
          </button>
          <button className="button-send" type="submit">
            {status !== 'ready' ? <IconSpinner /> : <IconSend />}
          </button>
        </Suspense>
      </form>
      <div
        id="recipes"
        style={{ opacity: recipe ? 1 : 0, height: recipe ? 124 : 0 }}
      >
        <div className="recipe-names">
          {recipes.map((recipe) => (
            <button
              key={recipe.name}
              className="recipe"
              onClick={async () => {
                if (!editorRef.current) return
                await editorRef.current.setValue(recipe.prompt)
                setRecipe(false)
              }}
              onMouseEnter={() => setHoveredRecipe(recipe)}
              onMouseLeave={() => setHoveredRecipe(null)}
            >
              {recipe.name}
            </button>
          ))}
        </div>
        <div className="recipe-description">
          <p>
            {hoveredRecipe
              ? hoveredRecipe.description
              : 'Hover over a recipe to see its description...'}
          </p>
        </div>
      </div>

      {status === 'error' && (
        <div className="prompt-error">
          <p>
            {error
              ? error.message
              : 'Something went wrong, please try again...'}
          </p>
        </div>
      )}
    </div>
  )
}
