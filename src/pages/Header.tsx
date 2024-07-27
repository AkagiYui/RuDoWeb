import { Clear, GitHub, Translate } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import React, { useState } from "react"

import Flex from "@/components/Flex"
import { useScreenWidth } from "@/hooks"
import { useI18n } from "@/i18n"
import { useDrawerState, useToDoList } from "@/stores"

export default function Header() {
  const [, toggleDrawer] = useDrawerState()
  const { filterText, setFilter } = useToDoList()
  const { isSmall } = useScreenWidth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const { t, changeLanguage, allLanguages: raw, currentLanguage } = useI18n("Header")
  const allLanguages: Record<string, string> = Object.fromEntries(raw.map((lang) => [lang, t(`Language.${lang}`)]))

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const handleClearFilter = () => {
    setFilter("")
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => (isSmall ? theme.zIndex.appBar : theme.zIndex.drawer + 1),
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
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

          {!isSmall && (
            <Typography variant="h6" component="div" sx={{ mr: 2 }} align="left">
              {t("title")}
            </Typography>
          )}

          <Box sx={{ flexGrow: 1, maxWidth: "100%", mx: 2, position: "relative" }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder={t("search")}
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              value={filterText}
              onChange={handleFilterChange}
            />
            {filterText && (
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                onClick={handleClearFilter}
              >
                <Clear />
              </IconButton>
            )}
          </Box>
        </Box>

        <Flex wrap={false}>
          <IconButton
            color="inherit"
            onClick={() => {
              window.open("https://github.com/AkagiYui/RuDoWeb", "_blank")
            }}
          >
            <GitHub />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleClick}
            aria-controls={open ? "language-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Translate />
          </IconButton>
        </Flex>
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
