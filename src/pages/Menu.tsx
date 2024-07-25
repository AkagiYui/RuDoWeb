import { ChecklistRtl, Info } from "@mui/icons-material"
import { Toolbar } from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import React from "react"
import { useNavigate } from "react-router-dom"

import { useScreenWidth } from "@/hooks"
import { useI18n } from "@/i18n"
import { useDrawerState } from "@/stores"

type MenuItem = {
  textKey: string // Changed from 'text' to 'textKey' for i18n
  icon: React.ReactNode
  path?: string
}

const topMenuItems: MenuItem[] = [{ textKey: "Home", icon: <ChecklistRtl />, path: "/" }]

const bottomMenuItems: MenuItem[] = [{ textKey: "About", icon: <Info />, path: "/about" }]

const MenuList: React.FC<{
  items: MenuItem[]
  onItemClick: (item: MenuItem) => void
  t: (key: string) => string // Added t function as a prop
}> = ({ items, onItemClick, t }) => (
  <List>
    {items.map((item) => (
      <ListItem key={item.textKey} disablePadding>
        <ListItemButton onClick={() => onItemClick(item)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={t(item.textKey)} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
)

export default function Menu() {
  const [drawerState, toggleDrawer] = useDrawerState()
  const { isSmall } = useScreenWidth()
  const navigate = useNavigate()
  const { t } = useI18n("Menu")

  const handleItemClick = (item: MenuItem) => {
    if (item.path) {
      navigate(item.path)
    } else {
      console.log(`${t(item.textKey)} clicked`)
    }
    toggleDrawer(false)
  }

  const DrawerContent = (
    <Box
      sx={{
        width: isSmall ? "100%" : 240,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <MenuList items={topMenuItems} onItemClick={handleItemClick} t={t} />
      </Box>
      <Divider />
      <Box>
        <MenuList items={bottomMenuItems} onItemClick={handleItemClick} t={t} />
      </Box>
    </Box>
  )

  return (
    <Drawer anchor={isSmall ? "top" : "left"} open={drawerState} onClose={() => toggleDrawer(false)}>
      {!isSmall && <Toolbar />}
      {DrawerContent}
    </Drawer>
  )
}
