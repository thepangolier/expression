import { type ReactNode, useCallback } from 'react'

export interface DialogProps {
  active: boolean
  setActive(v: boolean): void
  className: string
  children: ReactNode
}

export default function Dialog({
  active,
  setActive,
  className,
  children
}: DialogProps) {
  const handleOutsideClick = useCallback(() => {
    setActive(false)
  }, [setActive])

  return (
    <div
      className="expression-dialog"
      role="button"
      tabIndex={0}
      onClick={handleOutsideClick}
      onKeyDown={(e): void => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOutsideClick()
        }
      }}
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'inherit' : 'none'
      }}
    >
      <div
        className={`dialog-content ${className}`}
        role="button"
        tabIndex={0}
        onClick={(e): void => e.stopPropagation()}
        onKeyDown={(e): void => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation()
          }
        }}
      >
        {children}
      </div>
    </div>
  )
}
