import React from "react";
import { Card, CardImg, Row, Col, CardText } from "reactstrap";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StyledMainCard } from "./Styles/StyledMainCard";
import { Form} from './Form'

export const MainCard = () => {
  return (
    <StyledMainCard>
      <Card>
        <Header style={{ padding: "20px 40px" }}/>
        <Form/>
        <Footer style={{ padding: "20px 40px" }}/>
      </Card>
    </StyledMainCard>
  );
};
