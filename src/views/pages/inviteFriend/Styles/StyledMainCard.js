import React from "react";
import styled from "styled-components";

export const StyledMainCard = styled.div`
  width: 65%;

  h1 {
    font-weight: bold;
    color: black;
  }

  .button {
    background-color: #6f64f8;
    color: white;
    font-weight: bold;
    padding: 10px;
    border-radius: 5px;
    width: 95px;
    height : 42px;
    outline: none;
  }
  button:active {
    transform: translateY(4px);
  }

  .textarea {
    outline: none;
    resize: none;
    border-radius: 5px;
    border: 1px solid grey;
    vertical-align : center;
    padding : 5px 5px;
    color : #5c6169
  }
`;
