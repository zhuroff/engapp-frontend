import { useState } from "react"

export const useIsReadyState = () => {
  const [isReady, setIsReady] = useState(false)
  return [isReady, setIsReady] as const
}
