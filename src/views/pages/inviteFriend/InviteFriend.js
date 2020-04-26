import React from "react";
import { Card, CardImg, Row, Col, CardText } from "reactstrap";
import { MainCard } from "./MainCard";
import { Leaderboard } from "./Leaderboard";

export const InviteFriend = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <MainCard />
      <Card
        style={{
          width: "33%",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "20px 40px",
        }}
      >
        <Leaderboard />
      </Card>
    </div>
  );
};
