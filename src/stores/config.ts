import { useCallback } from "react"

import { useSharedState } from "@/hooks"

export const useCount = () => {
  const [countValue, setCountValue] = useSharedState("count", 0, { persist: true, crossTab: true })
  const countPlusOne = useCallback(() => {
    console.log("countPlusOne", countValue)
    setCountValue((prev) => prev + 1)
  }, [countValue, setCountValue])
  return [countValue, countPlusOne] as const
}

export const useDrawerState = () => {
  const [drawerOpen, setDrawerOpen] = useSharedState("drawerOpen", false)
  const toggleDrawer = useCallback((newState?: boolean) => {
    setDrawerOpen((prev) => (newState === undefined ? !prev : newState))
  }, [setDrawerOpen])

  return [drawerOpen, toggleDrawer] as const
}
