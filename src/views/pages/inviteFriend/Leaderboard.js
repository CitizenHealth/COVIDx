import React from "react";
import { Table } from "reactstrap";
import { IntlProvider, FormattedNumber } from "react-intl";
import { StyledLeaderboard } from "./Styles/StyledLeaderboard";

const testData = [
  {
    rank: 1,
    username: "purplerabbit28",
    covids: 17247,
  },
  {
    rank: 2,
    username: "redmonkey22",
    covids: 16488,
  },
  {
    rank: 3,
    username: "orangeseal18",
    covids: 16212,
  },
  {
    rank: 4,
    username: "bluemongoose",
    covids: 15987,
  },
  {
    rank: 5,
    username: "redstork33",
    covids: 15858,
  },
  {
    rank: 6,
    username: "tealdog39",
    covids: 14254,
  },
  {
    rank: 7,
    username: "blackcat97",
    covids: 14112,
  },
];
const fontStyle = {
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#444",
};

export class Leaderboard extends React.Component {
  state = {
    leaderboard: [],
  };
  componentDidMount() {
    this.setState({
      leaderboard: testData,
    });
  }
  render() {
    return (
      <StyledLeaderboard>
        <Table>
          <thead>
            <tr>
              <th>
                <h3>Leaderboard</h3>
              </th>
              <th>
                <h3>Covids</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.leaderboard.map((row) => (
              <tr key={row.rank}>
                <td style={fontStyle}>{row.username}</td>
                <td style={fontStyle}>
                  <IntlProvider>
                    <FormattedNumber value={row.covids} />
                  </IntlProvider>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </StyledLeaderboard>
    );
  }
}
