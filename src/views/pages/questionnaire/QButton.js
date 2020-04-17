import React from "react"
import { Button } from "reactstrap"

const PRIMARY_COLOR = "#7367f0"
const WHITE_COLOR = "#FFFFFF"

const QButton = ({ title, onClick }) => {
  return (
    <Button
      overrides={{ backgroundColor: PRIMARY_COLOR }}
      style={{ backgroundColor: PRIMARY_COLOR, color: WHITE_COLOR }}
      onClick={onClick}
    >
      {title}
    </Button>
  )
}

export default QButton
