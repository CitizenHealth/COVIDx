import React from "react"
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from "reactstrap"
import HappyIcon from "../../../assets/img/icons/happy.png"
import SadIcon from "../../../assets/img/icons/sad.png"

const HowAreYouFeeling = ({ selectEmotion }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}> How are you feeling ? </h2>
      <Row>
        <Col>
          <Card style={styles.card} onClick={() => selectEmotion("Happy")}>
            <CardImg style={styles.cardImg} src={HappyIcon} alt="happy icon" />
          </Card>
        </Col>
        <Col>
          <Card style={styles.card} onClick={() => selectEmotion("Sad")}>
            <CardImg style={styles.cardImg} src={SadIcon} alt="sad icon" />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    justifyContent: "center",
    paddingTop: "20px",
    paddingBottom: "20px",
    textAlign: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  cardImg: {
    width: "25%",
  },
}

export default HowAreYouFeeling
