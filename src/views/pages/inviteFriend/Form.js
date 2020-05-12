import React from "react";
import { Form, Input, Button, Textarea } from "reactstrap";

export class Forms extends React.Component {
  state = {
    link: "Link coming soon",
    post: `I did my part to stop the COVID-19 spread ! Join me on COVIDx to help science beat this virus!\nLink coming soon`,
    copySuccess: "",
  };

  copyCodeToClipboard = (event) => {
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
    event.target.focus();
    this.setState({ copySuccess: " Copied!" });
  };

  handleChange = (event) => {
    const prop = event.target.id;
    this.setState({ [prop]: event.target.value });
  };

  facebookRedirect = (event) => {
    window.open(
      `https://www.facebook.com/share.php?u=https%3A%2F%2Fcovidx.citizenhealth.io%2Fdashboard&caption=${this.state.post}`
    );
  };

  twitterRedirect = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${this.state.post}&hashtags=BeatCovid`
    );
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
          <textarea
            className="textarea"
            id="link"
            onChange={this.handleChange}
            value={this.state.link}
            ref={(textarea) => (this.textArea = textarea)}
            style={{
              width: "50%",
            }}
          />
          <Button
            className="button"
            style={{
              marginLeft: "20px",
              marginRight: "10px",
            }}
            color="#6f64f8"
            onClick={this.copyCodeToClipboard}
          >
            Copy Link
          </Button>
          {this.state.copySuccess}
        </div>

        <div
          style={{
            paddingTop: "50px",
            display: "flex",
            flexDirection: "column",
            width: "60%",
          }}
        >
          <textarea
            className="textarea"
            id="post"
            onChange={this.handleChange}
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
              onClick={this.facebookRedirect}
            >
              Facebook
            </Button>
            <Button
              className="button"
              color="#6f64f8"
              onClick={this.twitterRedirect}
            >
              Tweet
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}
