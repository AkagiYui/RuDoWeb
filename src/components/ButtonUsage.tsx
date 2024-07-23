import Button from "@mui/material/Button"

import { useCount } from "../store/config"

export default function ButtonUsage() {
  const [_, countPlusOne] = useCount()
  return (
    <Button variant="contained" onClick={countPlusOne}>
      Hello world
    </Button>
  )
}
