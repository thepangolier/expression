import '@scss/expression.scss'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Expression by Pangolier',
  description:
    'A Next.js Chat UI Template with comprehensive Markdown and Tool Calling support'
}

export interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
