import React from 'react'
import { Card, CardBody, CardText, Button } from 'reactstrap';


class FollowUp extends React.Component {
    handlePrevClick = () => {
        this.props.handler({ activeStep: this.props.feelingWell ? 1 : 2 })
    }
    handleSubmit = () => {
        let props_copy = { ...this.props }
        delete props_copy.activeStep;
        delete props_copy.feelingWell;
        alert(JSON.stringify(props_copy));
    }
    render() {
        return <Card>
            <CardBody>
                <CardText>TODO: Profile and Location</CardText>
                <Button onClick={this.handlePrevClick}>Prev</Button>
                <Button onClick={this.handleSubmit}>Submit</Button>
            </CardBody>
        </Card>
    }
}

export default FollowUp;