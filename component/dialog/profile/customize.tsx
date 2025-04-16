'use client'
import { useEffect, useState } from 'react'
import type { InstructionType, ProfileProps } from '@ai/action/profile'
import { IconCheckmark, IconSpinner } from '@component/shared/icon'

export interface ProfileCustomizeProps {
  profile: ProfileProps | null
  saveProfile(v: ProfileProps): Promise<void>
}

export default function ProfileCustomize({
  profile,
  saveProfile
}: ProfileCustomizeProps) {
  const [loading, setLoading] = useState(false)
  const [instructionType, setInstructionType] = useState(
    profile?.instructionType || ('concise' as InstructionType)
  )
  const [instructions, setInstructions] = useState(profile?.instructions || '')

  useEffect(() => {
    if (profile) {
      setInstructionType(profile.instructionType)
      setInstructions(profile.instructions)
    }
  }, [profile])

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (profile) {
          if (
            profile.instructionType === instructionType &&
            profile.instructions === instructions
          ) {
            return
          }

          setLoading(true)
          await saveProfile({
            ...profile,
            instructionType,
            instructions
          })
          setLoading(false)
        }
      }}
    >
      <div className="customize-select">
        <button
          type="button"
          onClick={() => setInstructionType('custom')}
          className={instructionType === 'custom' ? 'active' : 'inactive'}
        >
          <IconCheckmark />
          <span>Custom</span>
          <span>Write your own instructions for responses</span>
        </button>
        <button
          type="button"
          onClick={() => setInstructionType('concise')}
          className={instructionType === 'concise' ? 'active' : 'inactive'}
        >
          <IconCheckmark />
          <span>Concise</span>
          <span>Responses will be mainly concise bullet points</span>
        </button>
      </div>
      <textarea
        placeholder="Write instructions for your responses..."
        disabled={instructionType !== 'custom'}
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <button disabled={loading}>{loading ? <IconSpinner /> : 'Save'}</button>
    </form>
  )
}
