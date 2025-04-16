'use client'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@assets/img/logo.png'
import { IconHistory, IconNewThread, IconProfile } from '@component/shared/icon'

export interface HeaderProps {
  thread: boolean
  resetThread(): void
  setProfileDialog(v: boolean): void
  setHistoryDialog(v: boolean): void
}

export default function Header({
  thread,
  resetThread,
  setProfileDialog,
  setHistoryDialog
}: HeaderProps) {
  return (
    <header>
      <div className="container">
        <Link href="/" className="brand">
          <Image src={Logo} alt="Pangolier Logo" width={42} height={42} />
          Expression
        </Link>
        <nav>
          <button
            style={{
              opacity: thread ? 1 : 0,
              pointerEvents: thread ? 'inherit' : 'none'
            }}
            onClick={resetThread}
          >
            <IconNewThread />
            <span>New Thread</span>
          </button>
          <button onClick={() => setHistoryDialog(true)}>
            <IconHistory />
            <span>Thread History</span>
          </button>
          <button onClick={() => setProfileDialog(true)}>
            <IconProfile />
            <span>Profile</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
