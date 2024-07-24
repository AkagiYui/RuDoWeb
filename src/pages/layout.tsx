import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import { Outlet } from "react-router-dom"

import Header from "./Header"
import Menu from "./Menu"

export default function App() {
  return (
    <>
      <Menu />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <Toolbar /> {/* This empty Toolbar acts as a spacer */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}
