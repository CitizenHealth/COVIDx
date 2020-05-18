import { Card } from "reactstrap";
import styled from "styled-components";

export const StyledLeaderboard = styled(Card)`
  width: 33%;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 40px;

  @media screen and (max-width: 1001px) {
    width: 100%;
  }
`;
