import styled from "styled-components";

export const StyledInviteFriend = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 1001px) {
    flex-direction: column;
  }
`;
