'use client'
import { useEffect, useState } from 'react'
import type { ProfileProps } from '@ai/action/profile'
import { IconSpinner } from '@component/shared/icon'

export interface ProfileInfoProps {
  profile: ProfileProps | null
  saveProfile(v: ProfileProps): Promise<void>
}

export default function ProfileInfo({
  profile,
  saveProfile
}: ProfileInfoProps) {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(profile?.name || '')
  const [bio, setBio] = useState(profile?.bio || '')

  useEffect(() => {
    if (profile) {
      setName(profile.name)
      setBio(profile.bio)
    }
  }, [profile])

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (profile) {
          if (profile.name === name && profile.bio === bio) {
            return
          }

          setLoading(true)
          await saveProfile({
            ...profile,
            name,
            bio
          })
          setLoading(false)
        }
      }}
    >
      <div className="dialog-input">
        <label htmlFor="input-name">Name</label>
        <input
          id="input-name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="dialog-input">
        <label htmlFor="input-bio">Bio</label>
        <textarea
          id="input-bio"
          placeholder="I enjoy building chat interfaces..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <button disabled={loading}>{loading ? <IconSpinner /> : 'Save'}</button>
    </form>
  )
}
