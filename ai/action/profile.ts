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
