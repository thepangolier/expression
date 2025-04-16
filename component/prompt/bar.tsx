'use client'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import recipes, { type RecipeItem } from '@component/prompt/recipes'
import { IconBook, IconSend, IconSpinner } from '@component/shared/icon'
const Editor = dynamic(() => import('@component/shared/editor'), { ssr: false })

export interface PromptBarProps {
  status: 'submitted' | 'streaming' | 'ready' | 'error'
  error: Error | undefined
  input: string
  setInputAction: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  submitAction: (e: React.FormEvent<HTMLFormElement>) => void
}

export default function PromptBar({
  status,
  error,
  input,
  setInputAction,
  submitAction
}: PromptBarProps) {
  const [recipe, setRecipe] = useState(false)
  const [hoveredRecipe, setHoveredRecipe] = useState<RecipeItem | null>(null)

  return (
    <div id="prompt">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setRecipe(false)
          submitAction(e)
        }}
        className={status}
      >
        <Suspense>
          <Editor
            value={input}
            setValue={(v) => {
              setInputAction({
                target: { value: v } as EventTarget & HTMLTextAreaElement
              } as React.ChangeEvent<HTMLTextAreaElement>)
            }}
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
              onClick={() => {
                setInputAction({
                  target: { value: recipe.prompt } as EventTarget &
                    HTMLTextAreaElement
                } as React.ChangeEvent<HTMLTextAreaElement>)
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
