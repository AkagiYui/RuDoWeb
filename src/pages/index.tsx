import "./index.css"

import { Delete } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import TextField from "@mui/material/TextField"
import { useEffectOnActive } from "keepalive-for-react"
import { useState } from "react"

import { useI18n } from "@/i18n"
import { ToDoItem, useToDoList } from "@/stores"

import TodoDrawer from "./DetailDrawer"

const Index = () => {
  const [newTodo, setNewTodo] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ToDoItem | null>(null)

  useEffectOnActive(
    (active) => {
      console.log("useOnActive", active)
    },
    false,
    [],
  )

  const { t } = useI18n("MainList")
  const { toDoItems, doneItems, unDoneItems, addToDoItem, toggleToDoItem, removeToDoItem } = useToDoList()

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      addToDoItem(newTodo)
      setNewTodo("")
    }
  }

  const handleItemClick = (item: ToDoItem) => {
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <List style={{ flex: 1, overflowY: "auto" }}>
        {toDoItems.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            style={{ width: "100%" }}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => removeToDoItem(item.id)}>
                <Delete />
              </IconButton>
            }
          >
            <ListItemButton role={undefined} dense style={{ width: "100%" }} onClick={() => handleItemClick(item)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.done}
                  tabIndex={-1}
                  disableRipple
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleToDoItem(item.id)
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <div style={{ display: "flex", padding: "10px", position: "sticky", bottom: 0, backgroundColor: "white" }}>
        <TextField
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder={t("addTodo")}
          variant="outlined"
          onKeyUp={(e) => {
            if (e.key === "Enter" && newTodo.trim() !== "") {
              handleAddTodo()
            }
          }}
        />
        {newTodo.trim() !== "" && (
          <Button variant="contained" color="primary" onClick={handleAddTodo} style={{ marginLeft: "10px" }}>
            {t("add")}
          </Button>
        )}
      </div>
      <TodoDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => {}}
        selectedItem={selectedItem}
      />
    </div>
  )
}

export default Index
