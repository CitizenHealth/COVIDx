import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "reactstrap";


const WearableCard = ({ comingSoon, setComingSoon }) => {
  return (
    <div>
      <h2>Wearable Data</h2>
      <div className="button-container">
        <Button color="primary" onClick={() => setComingSoon(true)}>
          Connect to HumanAPI
        </Button>
      </div>
      <p>
        Connecting your Fitbit, Apple Watch, or other wearable device will allow
        us to show you more personalized insights.
      </p>
      <h5 style={!comingSoon ? { display: "none" } : null}>
        <i>Coming soon!</i>
      </h5>
    </div>
  );
}

WearableCard.propTypes = {
  comingSoon: PropTypes.bool,
  setComingSoon: PropTypes.func,
}

export default WearableCard
