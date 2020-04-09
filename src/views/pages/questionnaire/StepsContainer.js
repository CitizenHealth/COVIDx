import React from 'react';
import HowAreYouFeeling from "./HowAreYouFeeling";
import FeelingWell from "./FeelingWell";
import NotWell from "./NotWell";
import HaveYouBeenTested from "./HaveYouBeenTested";
import TookCovidTest from "./TookCovidTest";

class StepsContainer extends React.Component {


  render() {
    return (
      <div>
        {
          this.props.activeStep === 0 ?
            <HowAreYouFeeling selectEmotion={this.props.selectEmotion}/> :
            this.props.activeStep === 1 ?
              <FeelingWell selectSameRoomAsPositiveTest={this.props.selectSameRoomAsPositiveTest}/> :
              this.props.activeStep === 2 ?
                <NotWell selectSymptomsAndFever={this.props.selectSymptomsAndFever}/> :
                this.props.activeStep === 3 ?
                  <TookCovidTest/> :
                  this.props.activeStep === 5 ?
                    <HaveYouBeenTested haveYouBeenTestedAnswers={this.props.haveYouBeenTestedAnswers}/> :
                    this.props.activeStep === 6 ?
                      <div>Submit</div> :
                      <div>
                        Hello
                      </div>
        }
      </div>
    )
  }
}

export default StepsContainer;
