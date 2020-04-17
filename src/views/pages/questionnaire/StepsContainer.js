import React from "react"
import HowAreYouFeeling from "./HowAreYouFeeling"
import FeelingWell from "./FeelingWell"
import NotWell from "./NotWell"
import HaveYouBeenTested from "./HaveYouBeenTested"
import TookCovidTest from "./TookCovidTest"
import QButton from "./QButton"

const StepsContainer = ({
  activeStep,
  setStep,
  selectEmotion,
  selectSameRoomAsPositiveTest,
  selectSymptomsAndFever,
  haveYouBeenTestedAnswers,
}) => {
  return (
    <div style={styles.container}>
      {activeStep === 0 ? (
        <HowAreYouFeeling selectEmotion={selectEmotion} />
      ) : activeStep === 1 ? (
        <FeelingWell setStep={setStep} selectSameRoomAsPositiveTest={selectSameRoomAsPositiveTest} />
      ) : activeStep === 2 ? (
        <NotWell setStep={setStep} selectSymptomsAndFever={selectSymptomsAndFever} />
      ) : activeStep === 3 ? (
        <TookCovidTest setStep={setStep} />
      ) : activeStep === 5 ? (
        <HaveYouBeenTested setStep={setStep} haveYouBeenTestedAnswers={haveYouBeenTestedAnswers} />
      ) : activeStep === 6 ? (
        <div style={styles.pageContainer}>
          <h1 style={styles.title}> Thank you! </h1> <h3 style={styles.subTitle}> Your answers have been submitted </h3>
          <QButton onClick={() => setStep(0)}>Back</QButton>
        </div>
      ) : (
        <div> Hello </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    justfyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    color: "#7367f0",
  },
  subtitle: {},
}

export default StepsContainer
