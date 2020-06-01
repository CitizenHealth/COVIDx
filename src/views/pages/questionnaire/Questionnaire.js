import React, { useState, useEffect, useContext } from "react";
import "rc-slider/assets/index.css";
import "../../../assets/scss/plugins/extensions/slider.scss";
import { UserContext } from "App";
import styled from "styled-components";
import * as TripettoCollectorRolling from "tripetto-collector-rolling";
import TripettoServices from "tripetto-services";

const QuestionForm = styled.div`
  background-color: white;
  height: 80vh;
  > .tripetto-collector-rolling {
    width: inherit;
    height: inherit;
    position: relative;
  }
`;
const token = process.env.REACT_APP_TRIPETTO_HEALTH_REPORT_TOKEN;

const Questionnaire = (props) => {
  useEffect(() => {
    TripettoServices.init({
      token,
    });

    TripettoCollectorRolling.run({
      element: document.getElementById("survey"), // Or supply your own element here
      definition: TripettoServices.definition,
      style: TripettoServices.style,
      onFinish: TripettoServices.onFinish,
      onAttachment: TripettoServices.onAttachment,
    });
  });
  return <QuestionForm id="survey"></QuestionForm>;
};

export default Questionnaire;
