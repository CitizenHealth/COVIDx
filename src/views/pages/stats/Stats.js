import React, { useState } from "react"
import { Card, CardBody, Container, Row, Button } from "reactstrap"
import * as HumanApiClient from "humanapi-connect-client"

HumanApiClient.on("close", (response) => {
  console.log("Connect closed", response)
})
HumanApiClient.on("connect", (response) => {
  console.log("Source connected", response)
})
HumanApiClient.on("disconnect", (response) => {
  console.log("Source disconnected", response)
})

const Stats = () => {
  const [connected, setConnected] = useState(false)

  const connectWearable = () => {}

  return (
    <div style={styles.container}>
      <h4 style={{ paddingTop: "20px", paddingBottom: "20px" }}>Wearable Data</h4>
      <p style={styles.description}> Connect your data and get alerted when you might be infected</p>
      <div class="hapi__token-container">
        <button data-hapi-token="6afec5e52be32eafb4af80cbeec1231d063fda00">Connect your health data</button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    textAlign: "center",
    color: "#000000",
    marginLeft: "20px",
    marginRight: "20px",
  },
  button: {},
}
export default Stats
