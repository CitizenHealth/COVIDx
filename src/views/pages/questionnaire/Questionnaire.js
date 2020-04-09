import React from "react"
import StepsContainer from "./StepsContainer";

class Questionnaire extends React.Component {

  state = {
    activeStep: 0,
    emotion: null,
    stepsTaken: [0],
    feverInput: null,
    feverSelection: null,
    symptoms: [],
    testTaken: null,
    numPeoplePositive: null,
  };

  selectEmotion = (emotion) => {
    if (emotion === 'Happy') {
      this.setState({activeStep: 1, stepsTaken: [...this.state.stepsTaken, 1]})
    } else {
      this.setState({activeStep: 2, stepsTaken: [...this.state.stepsTaken, 2]})
    }
    this.setState({
      emotion: emotion
    });
  };

  selectSameRoomAsPositiveTest = (answer) => {
    if (answer === true && this.state.emotion === 'Happy') {
      this.setState({activeStep: 6, stepsTaken: [...this.state.stepsTaken, 6]})
    } else {
      this.setState({activeStep: 6, stepsTaken: [...this.state.stepsTaken, 6]})
    }
  };

  selectSymptomsAndFever = (answers) => {
    this.setState({
      activeStep: 5,
      stepsTaken: [...this.state.stepsTaken, 5],
      feverInput: answers.feverSelection,
      feverSelection: answers.feverSelection,
      symptoms: answers.symptoms
    });
  };

  haveYouBeenTestedAnswers = (e) => {
    if(e.testTaken === 'covid_19'){
      this.setState({activeStep: 3, stepsTaken: [...this.state.stepsTaken, 3]})
    } else {
      this.setState({
        activeStep: 6,
        stepsTaken: [...this.state.stepsTaken, 6],
        testTaken: e.testTaken,
        numPeoplePositive: e.numPeoplePositive
      })
    }
  };

  submitQuestionnaire = () => {
    alert('Submitted!');
  };

  render() {
    return <StepsContainer activeStep={this.state.activeStep}
                           selectEmotion={this.selectEmotion}
                           selectSameRoomAsPositiveTest={this.selectSameRoomAsPositiveTest}
                           selectSymptomsAndFever={this.selectSymptomsAndFever}
                           haveYouBeenTestedAnswers={this.haveYouBeenTestedAnswers}
                           submit={this.submitQuestionnaire}/>
  }
}

export default Questionnaire
