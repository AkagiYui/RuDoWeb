import React, { CSSProperties } from "react"

type FlexProps = {
  children?: React.ReactNode
  vertical?: boolean
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around"
  align?: "flex-start" | "center" | "flex-end" | "stretch"
  size?: "small" | "medium" | "large" | number | [number, number]
  inline?: boolean
  wrap?: boolean
}

const getSize = (size: FlexProps["size"]) => {
  if (typeof size === "number") {
    return `${size}px ${size}px`
  }
  if (Array.isArray(size)) {
    return `${size[0]}px ${size[1]}px`
  }
  switch (size) {
    case "small":
      return "8px"
    case "medium":
      return "16px"
    case "large":
      return "24px"
    default:
      return "8px"
  }
}

export default function Flex({
  children,
  vertical = false,
  justify = "center",
  align = "center",
  size = "small",
  inline = false,
  wrap = true,
}: FlexProps) {
  const style: CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    flexDirection: vertical ? "column" : "row",
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap ? "wrap" : "nowrap",
    gap: getSize(size),
  }

  return <div style={style}>{children}</div>
}
