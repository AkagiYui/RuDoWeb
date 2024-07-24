import { useCallback, useEffect, useState } from "react"

// 定义配置对象的接口
interface SharedStateConfig {
  persist?: boolean // 是否持久化到 localStorage
  crossTab?: boolean // 是否启用跨标签页同步
}

// 内存存储
const memoryStorage = new Map<string, any>()

// 事件系统
const eventSystem = {
  listeners: new Map<string, Set<(newValue: any) => void>>(),
  subscribe(key: string, callback: (newValue: any) => void) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set())
    }
    this.listeners.get(key)!.add(callback)
    return () => {
      this.listeners.get(key)?.delete(callback)
    }
  },
  publish(key: string, newValue: any) {
    this.listeners.get(key)?.forEach((callback) => {
      callback(newValue)
    })
  },
}

export function useSharedState<T>(key: string, initialValue: T, config: SharedStateConfig = {}) {
  // 解构配置对象，设置默认值
  const { persist = false, crossTab = false } = config

  // 用于跨标签页同步的完整 key
  const fullKey = `useSharedState_${key}`

  // 初始化状态
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (persist) {
      try {
        const item = window.localStorage.getItem(fullKey)
        return item ? (JSON.parse(item) as T) : initialValue
      } catch (error) {
        console.error("Error reading from localStorage:", error)
        return initialValue
      }
    } else {
      return (memoryStorage.get(key) as T) ?? initialValue
    }
  })

  // 更新状态的函数
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)

        if (persist) {
          window.localStorage.setItem(fullKey, JSON.stringify(valueToStore))
        } else {
          memoryStorage.set(key, valueToStore)
        }

        eventSystem.publish(key, valueToStore)
      } catch (error) {
        console.error("Error saving state:", error)
      }
    },
    [key, fullKey, storedValue, persist],
  )

  useEffect(() => {
    // 订阅内部事件系统
    const unsubscribeInternal = eventSystem.subscribe(key, (newValue) => {
      if (newValue !== storedValue) {
        setStoredValue(newValue as T)
      }
    })

    // 跨标签页同步
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === fullKey && persist && crossTab) {
        const newValue = e.newValue ? JSON.parse(e.newValue) as T : null
        if (newValue !== null && newValue !== storedValue) {
          setStoredValue(newValue as T)
          eventSystem.publish(key, newValue)
        }
      }
    }

    if (persist && crossTab) {
      window.addEventListener("storage", handleStorageChange)
    }

    // 清理函数
    return () => {
      unsubscribeInternal()
      if (persist && crossTab) {
        window.removeEventListener("storage", handleStorageChange)
      }
    }
  }, [key, fullKey, storedValue, persist, crossTab])

  return [storedValue, setValue] as const
}

export default useSharedState
