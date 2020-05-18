import React from "react";
import {
  Card,
} from "reactstrap";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StyledMainCard } from "./Styles/StyledMainCard";
import { Forms} from './Form'

export const MainCard = () => {
  return (
    <StyledMainCard>
      <Card>
        <Header/>
        <Forms/>
        <Footer/>
      </Card>
    </StyledMainCard>
  );
};
