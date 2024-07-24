import Button from "@mui/material/Button"

import { useCount } from "@/stores"

export default function ButtonUsage() {
  const [, countPlusOne] = useCount()
  return (
    <Button variant="contained" onClick={countPlusOne}>
      Hello world
    </Button>
  )
}
