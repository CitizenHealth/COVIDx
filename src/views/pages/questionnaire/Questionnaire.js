import React from "react";
import { Route } from "react-router-dom";
import QuestionnaireMenu from "./QuestionnaireMenu";
import SurveyQuestions from "./SurveyQuestions";

const Questionnaire = () => {
  return (
    <div id="questionnaire-container" className="col-12 mx-auto">
      <Route exact path="/health-report/" component={QuestionnaireMenu} />
      <Route path="/health-report/:questionType" component={SurveyQuestions} />
    </div>
  );
};

export default Questionnaire;
