import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import KeepAlive from "keepalive-for-react"
import { useMemo } from "react"
import { useLocation, useOutlet } from "react-router-dom"

import Header from "./Header"
import Menu from "./Menu"

export default function App() {
  const outlet = useOutlet()
  const location = useLocation()
  const cacheKey = useMemo(() => {
    return location.pathname + location.search
  }, [location])

  return (
    <>
      <Menu />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <Toolbar /> {/* This empty Toolbar acts as a spacer */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <KeepAlive activeName={cacheKey} max={10} strategy={"LRU"}>
            {outlet}
          </KeepAlive>
        </Box>
      </Box>
    </>
  )
}
