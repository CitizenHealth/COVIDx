import React from "react";
import PropTypes from 'prop-types'
import styled from "styled-components";
import { Button } from "reactstrap";

const CheckInContainer = styled.div`
  text-align: center;
  
  .checkin-text {
    font-size: 16px;
    font-weight: bold;

    .checkin-number {
      color: #6f64f6;
    }
  }
`;
const Greeting = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const BtnContainer = styled.div`
  margin-bottom: 30px;
`
const Btn = styled(Button)`
  color: #6f64f6;
  border-color: #4234f3;
`;
const CheckInCard = ({ firstName, totalCheckins, onClick }) => {
  return (
    <CheckInContainer>
      <Greeting>Hi, {firstName}</Greeting>
      <BtnContainer>
        <Btn outline onClick={onClick} style>
          Check-in Today
        </Btn>
      </BtnContainer>
      <div className="checkin-text">
        <span className="checkin-number">{totalCheckins}</span> have checked in today
      </div>
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
