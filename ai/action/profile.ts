'use server'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const profilePath = join(process.cwd(), '.next', 'profile.json')

export type InstructionType = 'custom' | 'concise'

export interface ProfileProps {
  name: string
  bio: string
  instructionType: InstructionType
  instructions: string
}

/**
 * Retrieves the saved profile from disk, or returns a default empty profile.
 *
 * @returns Promise resolving to ProfileProps.
 */
export async function getProfile(): Promise<ProfileProps> {
  if (existsSync(profilePath)) {
    return JSON.parse(readFileSync(profilePath, 'utf-8')) as ProfileProps
  } else {
    return {
      name: '',
      bio: '',
      instructionType: 'concise',
      instructions: ''
    } as ProfileProps
  }
}

export interface SaveProfileProps {
  name?: string
  bio?: string
  instructionType?: InstructionType
  instructions?: string
}

/**
 * Updates and persists the profile on disk by merging provided fields into the existing profile.
 *
 * @param props - Partial profile fields to override in the stored profile.
 * @param props.name - (optional) New name to set.
 * @param props.bio - (optional) New bio to set.
 * @param props.instructionType - (optional) New instructionType to set.
 * @param props.instructions - (optional) New instructions text to set.
 * @returns Promise resolving when the profile has been written to disk.
 */
export async function saveProfile({
  name,
  bio,
  instructionType,
  instructions
}: SaveProfileProps): Promise<void> {
  const profile = await getProfile()

  if (name) {
    profile.name = name
  }
  if (bio) {
    profile.bio = bio
  }
  if (instructionType) {
    profile.instructionType = instructionType
  }
  if (instructions) {
    profile.instructions = instructions
  }

  writeFileSync(profilePath, JSON.stringify(profile, null, 2))
}
