import React from "react";
import {
  Card,
  Form,
  CardImg,
  Row,
  Col,
  CardText,
  Input,
  Button,
} from "reactstrap";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StyledMainCard } from "./Styles/StyledMainCard";

export const MainCard = () => {
  return (
    <StyledMainCard>
      <Card>
        <Header />
        <Form
          style={{
            padding: "20px 40px",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div>
            <Input
              value="Link coming soon"
              style={{ width: "60%", display: "inline-block" }}
            />
            <Button color="primary" style={{ marginLeft: "20px" }}>
              Copy Link
            </Button>
          </div>

          <div
            style={{
              paddingTop: "50px",
              display: "flex",
              flexDirection: "column",

              width: "60%",
            }}
          >
            <Input
              type="textarea"
              value="I did my part to stop the COVID-19 spread ! Join me on COVIDx to help science beat this virus! #BeatCovid
                  Link coming soon"
              style={{
                marginBottom: "20px",
                height: "100px",
                textAlign: "left",
                width: "100%",
              }}
            />
            <div
              style={{
                paddingTop: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button color="primary" style={{ marginRight: "20px" }}>
                Facebook
              </Button>
              <Button color="primary">Twitter</Button>
            </div>
          </div>
        </Form>
        <Footer />
      </Card>
    </StyledMainCard>
  );
};
