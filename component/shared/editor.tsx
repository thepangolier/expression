'use client'
import '@blocknote/mantine/style.css'
import { type KeyboardEventHandler, useEffect, useRef } from 'react'
import {
  BlockNoteSchema,
  type BlockSpecs,
  defaultBlockSpecs,
  defaultInlineContentSpecs
} from '@blocknote/core'
import { BlockNoteView } from '@blocknote/mantine'
import { useCreateBlockNote } from '@blocknote/react'

export interface EditorProps {
  placeholder?: string
  value?: string
  setValue?: (v: string) => void
  onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined
  editable?: boolean
}

const blockSpecs: BlockSpecs = {}

Object.keys(defaultBlockSpecs)
  .filter((key) => {
    if (
      key === 'file' ||
      key === 'video' ||
      key === 'audio' ||
      key === 'image' ||
      key === 'table'
    ) {
      return false
    } else {
      return true
    }
  })
  .map((key) => {
    blockSpecs[key] = defaultBlockSpecs[key as keyof typeof defaultBlockSpecs]
  })

const schema = BlockNoteSchema.create({
  blockSpecs,
  inlineContentSpecs: defaultInlineContentSpecs
})
export default function Editor({
  placeholder,
  value,
  setValue,
  onKeyDown,
  editable = true
}: EditorProps) {
  const editor = useCreateBlockNote({
    schema
  })
  const isSettingContent = useRef(false)

  useEffect(() => {
    ;(async () => {
      if (editor && value !== undefined) {
        const existing = await editor.blocksToMarkdownLossy(editor.document)
        if (!existing || existing !== value) {
          isSettingContent.current = true
          const blocks = await editor.tryParseMarkdownToBlocks(value)
          console.log(blocks)
          editor.replaceBlocks(editor.document, blocks)
          isSettingContent.current = false
        }
      }
    })()
  }, [editor, value])

  async function onChange() {
    if (isSettingContent.current) {
      return // Skip setValue during programmatic updates
    }
    const markdown = await editor.blocksToMarkdownLossy(editor.document)
    if (setValue) {
      setValue(markdown)
    }
  }

  return (
    <div className="expression-editor">
      <BlockNoteView
        aria-placeholder={placeholder}
        theme="light"
        editor={editor}
        onChange={onChange}
        onKeyDown={onKeyDown}
        spellCheck={editable}
        editable={editable}
        sideMenu={false}
        formattingToolbar={false}
      />
    </div>
  )
}
