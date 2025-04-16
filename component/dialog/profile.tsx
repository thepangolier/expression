'use client'
import { useCallback, useEffect, useState } from 'react'
import { getProfile, type ProfileProps, saveProfile } from '@ai/action/profile'
import ProfileCustomize from '@component/dialog/profile/customize'
import ProfileInfo from '@component/dialog/profile/info'
import Dialog from '@component/shared/dialog'
import { IconExit, IconSpinner } from '@component/shared/icon'

export interface ProfileDialogProps {
  active: boolean
  setActive(v: boolean): void
}

export default function ProfileDialog({
  active,
  setActive
}: ProfileDialogProps) {
  const [tab, setTab] = useState('info' as 'info' | 'customize')
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<null | ProfileProps>(null)

  useEffect(() => {
    setLoading(true)
    async function retrieveProfile() {
      setProfile(await getProfile())
      setLoading(false)
    }
    retrieveProfile()
  }, [setLoading, setProfile])

  const saveProfileAction = useCallback(
    async (profile: ProfileProps) => {
      await saveProfile(profile)
      setProfile(profile)
    },
    [setProfile]
  )

  return (
    <Dialog active={active} setActive={setActive} className="dialog-profile">
      <div className="dialog-header">
        <h3>Profile</h3>
        <button className="exit" onClick={() => setActive(false)}>
          <IconExit />
        </button>
      </div>
      <div className="dialog-content-wrapper">
        <div
          className="dialog-loader"
          style={{
            opacity: loading ? 1 : 0
          }}
        >
          <IconSpinner />
        </div>

        <div className="dialog-content-column">
          <button
            onClick={() => setTab('info')}
            className={tab === 'info' ? 'active' : 'inactive'}
          >
            My Info
          </button>
          <button
            onClick={() => setTab('customize')}
            className={tab === 'customize' ? 'active' : 'inactive'}
          >
            Customize
          </button>
        </div>
        {tab === 'info' && profile && (
          <ProfileInfo profile={profile} saveProfile={saveProfileAction} />
        )}
        {tab === 'customize' && profile && (
          <ProfileCustomize profile={profile} saveProfile={saveProfileAction} />
        )}
      </div>
    </Dialog>
  )
}
