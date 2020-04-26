import React from "react";

export class Form extends React.Component {
  state = {
    link: "Link coming soon",
    post: `I did my part to stop the COVID-19 spread ! Join me on COVIDx to help science beat this virus! #BeatCovid \n Link coming soon`,
  };

  render() {
    return (
      <form
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
            alignItems : "center",
            
          }}
        >
          <textarea
            className="textarea"
            value={this.state.link}
            style={{
              width: "50%",
            }}
          />
          <button
            className="button"
            style={{
              marginLeft: "20px",
            }}
          >
            Copy Link
          </button>
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
            <button
              className="button"
              style={{
                marginRight: "40px",
              }}
            >
              Facebook
            </button>
            <button className="button">Tweet</button>
          </div>
        </div>
      </form>
    );
  }
}
