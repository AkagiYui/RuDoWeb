import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

import Flex from "@/components/Flex"
import { useI18n } from "@/i18n"

const readme = `
RuDo 如做
一个简单的React应用

相关技术栈
React 18
React Router 6
KeepAlive Component
i18n
`

export default function About() {
  //throw new Error()
  const { t } = useI18n("About")
  const navigate = useNavigate()

  return (
    <Flex vertical>
      {readme.split("\n").map((line, index) => (
        <div key={index}>{line}</div>
      ))}
      <a href="https://github.com/AkagiYui/RuDoWeb" target="_blank" rel="noreferrer">
        https://github.com/AkagiYui/RuDoWeb
      </a>
      <Button variant="contained" onClick={() => navigate("/")}>{t("back")}</Button>
    </Flex>
  )
}
