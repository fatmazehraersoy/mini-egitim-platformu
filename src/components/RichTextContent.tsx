import { useMemo } from "react"
import DOMPurify from "dompurify"

type RichTextContentProps = {
  html: string
  className?: string
}

function RichTextContent({
  html,
  className = "",
}: RichTextContentProps) {
  const cleanHtml = useMemo(
    () => DOMPurify.sanitize(html),
    [html],
  )

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: cleanHtml,
      }}
    />
  )
}

export default RichTextContent