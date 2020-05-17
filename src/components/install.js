import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const Instructions = ({ steps }) => {
    return (<ol>
        { steps.map((item) => <li>{item}</li>) }
        </ol>);
}
const ModalExample = ({ show, close }) => {
  return show
  ? (<div>
      <Modal style={{marginTop: '2em'}} isOpen={show}>
        <ModalHeader>Install COVIDx</ModalHeader>
        <ModalBody>
            <h5>iOS</h5>
            <Instructions steps={[
                "Click the share sheet icon",
                "Press 'Add to homescreen'"
            ]}/>
            <h5>Android</h5>
            <Instructions steps={[
                "Click the menu icon",
                "Press 'Add to homescreen'"
            ]}/>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  ) : null
}
const InstallButton = () => {
    const [installClicked, updateClicked] = useState(false);
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    const installButton = (<button id="install-button" className="btn-primary" 
        onClick={
            () => {
                updateClicked(true);
            }
        }
        style={{
            marginRight:"auto", 
            border:"none",
            borderRadius: "5px",
            textAlign: 'center',
            padding: '5px',
            paddingLeft: '15px',
            paddingRight: '15px'

        }}>Install App</button>)

    return isInstalled
    ? null
    : (<>
        { installButton }
        {
            installClicked
            ? <ModalExample show={installClicked} close={() => updateClicked(false)}/>
            : null
        }</>)
}
export default InstallButton;
