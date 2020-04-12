import React, { useEffect, useState } from "react";
import StatisticsCard from "components/@vuexy/statisticsCard/StatisticsCard";
import ProfileTitleSection from "./components/TitleSection";
import { Card, CardBody } from "reactstrap";

import { setAuth } from "redux/actions/auth/authAction";
import { connect } from "react-redux";


const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { setAuth })(Profile);

export function Profile(props) {
  const [userData, setUserData] = useState(null)
  const payload = props.auth.login.payload.payload[0]
  const defaultProfileImage = require("./images/placeholder.png")

  return (
    <>
      <ProfileTitleSection
      name = { payload.display_name }
      joinDate = { payload.date_join }
      Image = { defaultProfileImage } 
      />
      <div className="content-card">
        <Card className="card">
          <CardBody className="card-info">
            {
              Object.keys(payload).map(k => 
                <div>{ k }:</div> 
                // <div>{payload[k]}</div>
              )
            }
          </CardBody>
        </Card>
      </div>
    </>
  )
};