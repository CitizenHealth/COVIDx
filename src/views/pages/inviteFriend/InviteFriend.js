import React from "react";
import { MainCard } from "./MainCard";
import { Leaderboard } from "./Leaderboard";
import { StyledInviteFriend } from "./Styles/StyledInviteFriend";

export const InviteFriend = () => {
  return (
    <StyledInviteFriend>
      <MainCard />
      <Leaderboard />
    </StyledInviteFriend>
  );
};
