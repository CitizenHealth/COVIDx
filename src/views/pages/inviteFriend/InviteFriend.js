import React from "react";
import { Card, CardImg, Row, Col, CardText } from "reactstrap";
import { MainCard} from "./MainCard"


export const InviteFriend = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
       
      }}
    >
          <MainCard/>
      <Card
        style={{ width: "33%", flexDirection: "row", justifyContent: "space-between", padding: "20px 40px"}}
      >
        <h3>Leaderboard</h3>
        <h3>Covids</h3>
      </Card>
    </div>
  );
};
