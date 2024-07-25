import MailIcon from "@mui/icons-material/Mail"
import InboxIcon from "@mui/icons-material/MoveToInbox"
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

import { useScreenWidth } from "@/hooks"
import { useDrawerState } from "@/stores"

type MenuItem = {
  text: string
  icon: React.ReactNode
  onClick: () => void // 新增: 为每个菜单项添加点击回调
}

const topMenuItems: MenuItem[] = [
  { text: "Inbox", icon: <InboxIcon />, onClick: () => console.log("Inbox clicked") },
  { text: "Starred", icon: <MailIcon />, onClick: () => console.log("Starred clicked") },
  { text: "Send email", icon: <InboxIcon />, onClick: () => console.log("Send email clicked") },
  { text: "Drafts", icon: <MailIcon />, onClick: () => console.log("Drafts clicked") },
]

const bottomMenuItems: MenuItem[] = [
  { text: "All mail", icon: <InboxIcon />, onClick: () => console.log("All mail clicked") },
  { text: "Trash", icon: <MailIcon />, onClick: () => console.log("Trash clicked") },
  { text: "Spam", icon: <InboxIcon />, onClick: () => console.log("Spam clicked") },
]

const MenuList: React.FC<{ items: MenuItem[] }> = ({ items }) => (
  <List>
    {items.map((item) => (
      <ListItem key={item.text} disablePadding>
        <ListItemButton onClick={item.onClick}>
          {" "}
          {/* 修改: 添加onClick处理 */}
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
)

export default function Menu() {
  const [drawerState, toggleDrawer] = useDrawerState()
  const { isSmall } = useScreenWidth()

  const handleItemClick = (callback: () => void) => {
    callback()
    toggleDrawer(false) // 点击后关闭抽屉
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
        <MenuList
          items={topMenuItems.map((item) => ({
            ...item,
            onClick: () => {
              handleItemClick(item.onClick)
            },
          }))}
        />
      </Box>
      <Divider />
      <Box>
        <MenuList
          items={bottomMenuItems.map((item) => ({
            ...item,
            onClick: () => {
              handleItemClick(item.onClick)
            },
          }))}
        />
      </Box>
    </Box>
  )

  return (
    <Drawer anchor={isSmall ? "top" : "left"} open={drawerState} onClose={() => toggleDrawer()}>
      {!isSmall && <Toolbar />}
      {DrawerContent}
    </Drawer>
  )
}
