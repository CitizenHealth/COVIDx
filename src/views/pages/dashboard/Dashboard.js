import React, { useState } from "react";
import styled from "styled-components";
import { Card, CardBody, Modal, ModalBody } from "reactstrap";
import HeatMap from "../heatMap/heatMap";

import "./dashboard.scss";
import { QuestionForm } from "components/Tripetto/QuestionForm";
import CheckInCard from "./CheckIn";
import WearableCard from "./Wearables";

const ModalContent = styled(ModalBody)`
  width: 900px;
  margin: 0 auto;
`;

const ModalControl = styled.div`
  align-content: right;
  text-align: right;
  padding: 20px;
  cursor: pointer;
`;

const Dashboard = (props) => {
  const [comingSoon, setComingSoon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <div className="custom-dashboard">
      <Modal
        size="xl"
        isOpen={showModal}
        toggle={toggleModal}
        style={{ paddingTop: 40 }}
      >
        <ModalControl>
          <span
            onClick={() => {
              setShowModal(false);
            }}
          >
            x
          </span>
        </ModalControl>
        <ModalContent>
          <QuestionForm />
        </ModalContent>
      </Modal>
      <Card className="Card-checkin">
        <CardBody className="Dashboard-cardbody">
          <CheckInCard onClick={toggleModal} />
        </CardBody>
      </Card>
      <div className="widgets">
        <div className="wearable-data-container">
          <Card className="wearable-data">
            <CardBody>
              <WearableCard
                comingSoon={comingSoon}
                setComingSoon={setComingSoon}
              />
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardBody>
            <HeatMap />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default Dashboard;
