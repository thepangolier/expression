import Image from 'next/image'
import Logo from '@assets/img/logo.png'

export interface TitleProps {
  visible: boolean
}

export default function Title({ visible }: TitleProps) {
  return (
    <div
      id="title"
      style={{ height: visible ? 180 : 0, padding: visible ? 15 : 0 }}
    >
      <div className="title-header">
        <Image src={Logo} alt="Pangolier Logo" width={96} height={96} />
        <h1>
          Expression <span>By Pangolier</span>
        </h1>
      </div>
      <p>
        A Next.js Chat UI Template with comprehensive Markdown and Tool Calling
        support
      </p>
    </div>
  )
}
