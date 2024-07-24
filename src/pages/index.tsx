import "./index.css"

import { Button, TextField } from "@mui/material"
import { useEffectOnActive } from "keepalive-for-react"
import { useNavigate } from "react-router-dom"

import ButtonUsage from "@/components/ButtonUsage"
import Flex from "@/components/Flex"
import { useCount } from "@/stores"

import reactLogo from "./react.svg"
import viteLogo from "/vite.svg"

export default function Index() {
  const [countValue, countPlusOne] = useCount()
  const navigate = useNavigate()
  useEffectOnActive(
    (active) => {
      console.log("useOnActive", active)
    },
    false,
    [],
  )

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={countPlusOne}>count is {countValue}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Flex vertical>
        <ButtonUsage />
        <Button
          variant="contained"
          onClick={() => {
            navigate("/about")
          }}
        >
          about
        </Button>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Flex>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}
