import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useCallback } from 'react'

const countAtom = atomWithStorage("count", 0)

export const useCount = () => {
  const [countValue, setCountValue] = useAtom(countAtom)
  
  const countPlusOne = useCallback(() => {
    console.log("countPlusOne", countValue)
    setCountValue(prev => prev + 1)
  }, [countValue, setCountValue])

  return [countValue, countPlusOne] as const
}