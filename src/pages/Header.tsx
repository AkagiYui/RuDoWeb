import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import { useScreenWidth } from "@/hooks"
import { useDrawerState } from "@/stores"

export default function Header() {
  const [, toggleDrawer] = useDrawerState()
  const { isSmall } = useScreenWidth()

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => (isSmall ? theme.zIndex.appBar : theme.zIndex.drawer + 1),
      }}
    >
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RuDo
        </Typography>
        <Button color="inherit">Logi1n</Button>
      </Toolbar>
    </AppBar>
  )
}
