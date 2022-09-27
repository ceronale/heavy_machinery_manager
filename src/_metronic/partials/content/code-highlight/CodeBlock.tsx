/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Highlight, {defaultProps, Language} from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/shadesOfPurple'
import {OverlayTrigger, Tooltip} from 'react-bootstrap-v5'

type Props = {
  code: string
  language: Language
}

const CodeBlock: React.FC<Props> = ({code, language}) => {
  const codeRef = useRef<HTMLDivElement | null>(null)
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) {
      return
    }

    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }, [copied])

  useEffect(() => {
    if (!codeRef.current) {
      return
    }

    const prismCodeElement = codeRef.current.querySelector('.prism-code ') as HTMLDivElement
    if (prismCodeElement) {
      prismCodeElement.style.background = 'none'
      prismCodeElement.style.fontSize = '12px'
    }
  }, [])

  return (

<div ></div>
  )
}

export {CodeBlock}
