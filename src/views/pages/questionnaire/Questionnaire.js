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
        // For example retrieve the results as a CSV-file:
        const csv = TripettoCollector.Export.CSV(instance);
        // Or retrieve the individual fields:
        const fields = TripettoCollector.Export.fields(instance).fields;
        console.log("results: ", fields);
      },
    });
  });
  return <QuestionForm id="survey"></QuestionForm>;
};

export default Questionnaire;
