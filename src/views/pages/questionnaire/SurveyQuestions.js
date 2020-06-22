import React, { useEffect, useContext } from "react";
import { Card, CardBody } from "reactstrap";
import "./questionnaire.scss";
import * as TripettoCollector from "tripetto-collector";
import * as TripettoCollectorRolling from "tripetto-collector-rolling";
import questions from "./questions.json";
import { UserContext } from "App";
import { customPost } from "utility/customFetch";

const SurveyQuestions = ({ match }) => {
  const user = useContext(UserContext);
  console.log(match.params.questionType);

  useEffect(() => {
    TripettoCollectorRolling.run({
      element: document.getElementById("survey"), // Or supply your own element here
      definition: questions,
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

        // obtain values from raw data
        const survey_answers = {
          how_are_you_feeling: parseInt(fields[0].value),
          current_symptoms: fields
            .slice(1, 17)
            .filter((x) => x.value)
            .map((x) => x.name),
          temperature: fields[18].value,
          fever_best_guess: fields[19].value,
          self_tested: fields[20].value,
          self_date_tested: fields[21].value,
          household_tested: fields[22].value,
          household_date_tested: fields[23].value,
          medical_conditions: fields
            .slice(24, 33)
            .filter((x) => x.value)
            .map((x) => x.name),
        };
        console.log(survey_answers);
        customPost('/health_checkin/response', user.accessToken, survey_answers)
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
