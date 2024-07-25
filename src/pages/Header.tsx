import { Translate } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import React, { useState } from "react"

import { useScreenWidth } from "@/hooks"
import { useI18n } from "@/i18n"
import { useDrawerState } from "@/stores"

export default function Header() {
  const [, toggleDrawer] = useDrawerState()
  const { isSmall } = useScreenWidth()
  const { t, changeLanguage, allLanguages, currentLanguage } = useI18n()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang)
    handleClose()
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => (isSmall ? theme.zIndex.appBar : theme.zIndex.drawer + 1),
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => toggleDrawer()}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          RuDo
        </Typography>
        <IconButton
          color="inherit"
          onClick={handleClick}
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Translate />
        </IconButton>
        <Menu id="language-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          {Object.entries(allLanguages).map(([code, name]) => (
            <MenuItem key={code} onClick={() => handleLanguageChange(code)} selected={code === currentLanguage}>
              {name}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
