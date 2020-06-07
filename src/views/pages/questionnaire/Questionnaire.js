import React, { useEffect } from "react";
import "rc-slider/assets/index.css";
import "../../../assets/scss/plugins/extensions/slider.scss";
import styled from "styled-components";
import * as TripettoCollector from "tripetto-collector";
import * as TripettoCollectorRolling from "tripetto-collector-rolling";
import questions from "./questions.json";

const QuestionForm = styled.div`
  background-color: white;
  height: 80vh;
  > .tripetto-collector-rolling {
    width: inherit;
    height: inherit;
    position: relative;
  }
`;
const Questionnaire = () => {
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
        const how_are_you_feeling = parseInt(fields[0].value);
        console.log("how_are_you_feeling", how_are_you_feeling);
        const current_symptoms = fields
          .slice(1, 17)
          .filter((x) => x.value)
          .map((x) => x.name);
        console.log("current_symptoms", current_symptoms);
        const temperature = fields[18].value;
        console.log("temperature", temperature);
        const fever_best_guess = fields[19].value;
        console.log("fever_best_guess", fever_best_guess);
        const self_tested = fields[20].value;
        console.log("self_tested", self_tested);
        const self_date_tested = fields[21].value;
        console.log("self_date_tested", self_date_tested);

        const household_tested = fields[22].value;
        console.log("household_tested", household_tested);
        const household_date_tested = fields[23].value;
        console.log("household_date_tested", household_date_tested);
        const medical_conditions = fields
          .slice(24, 33)
          .filter((x) => x.value)
          .map((x) => x.name);
        console.log("medical_conditions", medical_conditions);
      },
    });
  });
  return <QuestionForm id="survey"></QuestionForm>;
};

export default Questionnaire;
