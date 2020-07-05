import React, { useEffect, useContext } from "react";
import { Card, CardBody } from "reactstrap";
import "./questionnaire.scss";
import * as TripettoCollector from "tripetto-collector";
import * as TripettoCollectorRolling from "tripetto-collector-rolling";
import { UserContext } from "App";
import { forms, parsingRules } from "./questions/utils";
import { customPost } from "utility/customFetch";

const SurveyQuestions = ({ match }) => {
  const user = useContext(UserContext);
  console.log(match.params.questionType);

  useEffect(() => {
    TripettoCollectorRolling.run({
      element: document.getElementById("survey"), // Or supply your own element here
      definition: forms[match.params.questionType],
      style: {
        centerActiveBlock: true,
        showProgressbar: true,
        showEnumerators: false,
        showNavigation: true,
        showScrollbar: true,
        autoFocus: false,
      },
      onFinish: (instance) => {
        // TODO: Handle the collector results
        // retrieve the individual fields:
        const fields = TripettoCollector.Export.fields(instance).fields;

        console.log(fields);
        const survey_answers = parsingRules[match.params.questionType](fields);
        console.log(survey_answers);
        if (survey_answers.hasOwnProperty("how_are_you_feeling")) {
          customPost(
            "/health_checkin/response",
            user.accessToken,
            survey_answers
          );
          console.log("Your answer has been submitted!");
        }
      },
    });
  }, []);
  return (
    <Card>
      <CardBody>
        <div id="survey"></div>
      </CardBody>
    </Card>
  );
};

export default SurveyQuestions;
