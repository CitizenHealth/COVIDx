import React, { useEffect, useContext } from "react";
import { Card, CardBody } from "reactstrap";
import "./questionnaire.scss";
import { run } from "tripetto-runner-autoscroll";
import { Export } from "tripetto-runner-foundation";

import { UserContext } from "App";
import { forms, parsingRules } from "./questions/utils";
import { customPost } from "utility/customFetch";

const SurveyQuestions = ({ match }) => {
  const user = useContext(UserContext);
  console.log(match.params.questionType);

  useEffect(() => {
    run({
      element: document.getElementById("survey"),
      definition: forms[match.params.questionType],
      styles: {
        contract: { name: "tripetto-runner-autoscroll", version: "3.5.3" },
        showNavigation: "auto",
        showProgressbar: true,
        showEnumerators: false,
        showScrollbar: false,
        autoFocus: false,
        verticalAlignment: "middle",
        direction: "vertical",
        hidePast: false,
        hideUpcoming: false,
        showSeparateSubmit: false,
        showPreviousButton: true,
      },
      l10n: {
        contract: { name: "tripetto-runner-autoscroll", version: "3.5.3" },
      },
      onSubmit: (instance) => {
        const fields = Export.fields(instance).fields;

        console.log(fields);
        const survey_answers = {
          form: match.params.questionType,
          responses: parsingRules[match.params.questionType](fields),
        };
        console.log("survey_answers:", survey_answers);
        if (survey_answers["responses"].hasOwnProperty("how_are_you_feeling")) {
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
