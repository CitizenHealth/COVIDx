import React from 'react';
import HowAreYouFeeling from "./HowAreYouFeeling";
import FeelingWell from "./FeelingWell";
import NotWell from "./NotWell";
import HaveYouBeenTested from "./HaveYouBeenTested";
import FollowUp from "./FollowUp";

class Questionnaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0
    }
  }

  handleUpdate = update => {
    this.setState(update);
  };

  render() {
    switch (this.state.activeStep) {
      case 0: return <HowAreYouFeeling handler={this.handleUpdate} />;
      case 1: return <FeelingWell handler={this.handleUpdate} />;
      case 2: return <NotWell handler={this.handleUpdate} />;
      case 4: return <HaveYouBeenTested handler={this.handleUpdate} />;
      case 5: return <FollowUp handler={this.handleUpdate} {...this.state} />;
      default: throw new Error(`Invalid activeStep ${this.props.activeStep}`)
    }
  }
}

export default Questionnaire;
