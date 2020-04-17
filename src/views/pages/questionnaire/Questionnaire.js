import React, { useState, useEffect } from "react"
import StepsContainer from "./StepsContainer"

const TEST_TAKEN = "covid_19"

const Questionnaire = ({}) => {
  const [activeStep, setActiveStep] = useState(0)
  const [emotion, setEmotion] = useState(null)
  const [stepsTaken, setStepsTaken] = useState([0])
  const [feverInput, setFeverInput] = useState(null)
  const [feverSelection, setFeverSelection] = useState(null)
  const [symptoms, setSymptoms] = useState([])
  const [testTaken, setTestTaken] = useState(null)
  const [numPeoplePositive, setNumPeoplePositive] = useState(null)

  useEffect(() => {
    if (activeStep === 6) {
      submitQuestionnaire()
    }
  }, [activeStep])
  const setStep = (step) => {
    setActiveStep(step)
    setStepsTaken([...stepsTaken, step])
  }

  const selectEmotion = (emotion) => {
    emotion === "Happy" ? setStep(1) : setStep(2)
    setEmotion(emotion)
  }

  const selectSameRoomAsPositiveTest = (answer) => {
    answer === true && emotion === "Happy" ? setStep(5) : setStep(2)
  }

  const selectSymptomsAndFever = (answers) => {
    setStep(5)
    setFeverInput(answers.feverSelection)
    setFeverSelection(answers.feverSelection)
    setSymptoms(answers.symptoms)
  }

  const haveYouBeenTestedAnswers = (e) => {
    const isCovidTest = e.testTaken === TEST_TAKEN
    isCovidTest ? setStep(3) : setStep(6)
    if (!isCovidTest) {
      setTestTaken(e.testTaken)
      setNumPeoplePositive(e.numPeoplePositive)
    }
  }

  const submitQuestionnaire = () => {
    let data = `activeStep: ${activeStep}\n`
    data += `emotion: ${emotion}\n`
    data += `stepsTaken: ${stepsTaken}\n`
    data += `feverInput: ${feverInput}\n`
    data += `feverSelection: ${feverSelection}\n`
    data += `symptoms: ${symptoms}\n`
    data += `testTaken: ${testTaken}\n`
    data += `numPeoplePositive: ${numPeoplePositive}\n`
    alert(`${data}\n\nSubmitted!`)
  }

  return (
    <StepsContainer
      activeStep={activeStep}
      setStep={setStep}
      selectEmotion={selectEmotion}
      selectSameRoomAsPositiveTest={selectSameRoomAsPositiveTest}
      selectSymptomsAndFever={selectSymptomsAndFever}
      haveYouBeenTestedAnswers={haveYouBeenTestedAnswers}
    />
  )
}

export default Questionnaire
