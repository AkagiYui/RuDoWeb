import { useCallback } from "react"

import { useSharedState } from "@/hooks"

export class ToDoItem {
  id: string
  createDate: string
  constructor(
    public title: string,
    public done: boolean,
  ) {
    this.id = crypto.randomUUID()
    this.createDate = new Date().toDateString()
  }
}

export const useToDoList = () => {
  const [toDoItems, setToDoItems] = useSharedState(
    "todos",
    [new ToDoItem("Learn React", false), new ToDoItem("Learn TypeScript", true), new ToDoItem("Learn GraphQL", false)],
    { persist: true, crossTab: true },
  )

  const [filterText, setFilter] = useSharedState("filterText", "", { persist: true })

  const [doneItems, unDoneItems] = toDoItems.reduce<[ToDoItem[], ToDoItem[]]>(
    (acc, item) => {
      if (filterText && !item.title.includes(filterText)) {
        return acc
      }
      if (item.done) {
        acc[0].push(item)
      } else {
        acc[1].push(item)
      }
      return acc
    },
    [[], []],
  )

  const addToDoItem = useCallback((title: string) => {
    const newItem = new ToDoItem(title, false)
    setToDoItems([...toDoItems, newItem])
    return newItem.id
  }, [toDoItems, setToDoItems])

  const toggleToDoItem = useCallback((id: string) => {
    setToDoItems(
      toDoItems.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done }
        }
        return item
      }),
    )
  }, [toDoItems, setToDoItems])

  const removeToDoItem = useCallback((id: string) => {
    setToDoItems(toDoItems.filter((item) => item.id !== id))
  }, [toDoItems, setToDoItems])

  return {
    toDoItems,
    doneItems,
    unDoneItems,
    addToDoItem,
    toggleToDoItem,
    removeToDoItem,
  }
}
