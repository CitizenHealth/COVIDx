import React, { useState } from "react"
import { Form, FormGroup, Label, Input, FormText } from "reactstrap"
import QButton from "./QButton"

const FeelingWell = ({ setStep, selectSameRoomAsPositiveTest }) => {
  const [buttonSelected, setButtonSelected] = useState(null)

  const handleNextClick = (e) => {
    e.preventDefault()
    selectSameRoomAsPositiveTest(buttonSelected)
  }

  const handleButtonChange = (e) => {
    setButtonSelected(e.target.value)
  }

  const goBack = () => {
    setStep(0)
  }

  const goNext = () => {
    selectSameRoomAsPositiveTest(buttonSelected)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}> Feeling Well </h2>
      <Form onSubmit={(e) => handleNextClick(e)}>
        <FormGroup tag="fieldset">
          <legend style={styles.title}>
            Have you been in the same room as someone who has tested positive for COVID - 19 ?
          </legend>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" value="true" onChange={(e) => handleButtonChange(e)} />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" value="false" onChange={(e) => handleButtonChange(e)} />
              No
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input type="radio" name="radio1" value="false" onChange={(e) => handleButtonChange(e)} />I don 't know
            </Label>
          </FormGroup>
        </FormGroup>
      </Form>
      <div style={styles.buttonContainer}>
        <QButton title="Prev" onClick={goBack} />
        <QButton title="Next" onClick={goNext} />
      </div>
    </div>
  )
}

const styles = {
  container: {
    paddingTop: "20px",
    paddingBottom: "20px",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
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

export default FeelingWell
