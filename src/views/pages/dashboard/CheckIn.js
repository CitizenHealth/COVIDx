import React from "react";
import PropTypes from 'prop-types'
import styled from "styled-components";
import { Button } from "reactstrap";

const CheckInContainer = styled.div`
  text-align: center;
`
const Greeting = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const BtnContainer = styled.div`
  margin-bottom: 30px;
`

const CheckInCard = ({ firstName, totalCheckins, onClick }) => {
  return (
    <CheckInContainer>
      <Greeting>Hi, {firstName}</Greeting>
      <BtnContainer>
        <Button outline onClick={onClick} >Check-in Today</Button>
      </BtnContainer>
      <div>{totalCheckins} have checked in today</div>
    </CheckInContainer>
  );
};

CheckInCard.defaultProps = {
  firstName: "User",
  totalCheckins: 9000,
}

CheckInCard.propTypes = {
  firstName: PropTypes.string,
  totalCheckins: PropTypes.number,
  onClick: PropTypes.func.isRequired,
}

export default CheckInCard
