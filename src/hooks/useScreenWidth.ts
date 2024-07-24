import { useEffect,useState } from "react"

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isSmall: false,
    isMedium: false,
    isLarge: false,
  })

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth
      setScreenSize({
        isSmall: width < 600,
        isMedium: width >= 600 && width < 1024,
        isLarge: width >= 1024,
      })
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  return screenSize
}

export default useScreenSize
