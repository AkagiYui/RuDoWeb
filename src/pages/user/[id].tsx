import React from "react"
import { useParams } from "react-router-dom"

interface userProps {}

const User: React.FC<userProps> = () => {
  const { id } = useParams()
  return <div>User ID: {id}</div>
}

export default User
