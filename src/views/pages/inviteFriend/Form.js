import React from "react";
import { Form, Input, Button, Textarea } from "reactstrap";

export class Forms extends React.Component {
  state = {
    link: "Link coming soon",
    post: `I did my part to stop the COVID-19 spread ! Join me on COVIDx to help science beat this virus! #BeatCovid \n Link coming soon`,
  };

  render() {
    return (
      <Form
        style={{
          padding: "20px 40px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Input
            type="textarea"
            className="textarea"
            value={this.state.link}
            style={{
              width: "50%",
            }}
          />
          <Button
            className="button"
            style={{
              marginLeft: "20px",
            }}
            color="#6f64f8"
          >
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
            className="textarea"
            value={this.state.post}
            style={{
              marginBottom: "20px",
              height: "100px",
              width: "100%",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              className="button"
              color="#6f64f8"
              style={{
                marginRight: "40px",
              }}
            >
              Facebook
            </Button>
            <Button className="button" color="#6f64f8">
              Tweet
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}
