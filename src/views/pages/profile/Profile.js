import React, { useEffect, useState } from "react";
import StatisticsCard from "components/@vuexy/statisticsCard/StatisticsCard";
import { UserProfile } from "./components/UserProfile";
import  ProfileTitleSection from "./components/TitleSection";
import ImageCard from "components/imageCard/imageCard.js"

import { setAuth } from "redux/actions/auth/authAction";
import { connect } from "react-redux";


const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, { setAuth })(Profile);

export function Profile(props) {
  const [userData, setUserData] = useState(null)
  const payload = props.auth.login.payload.payload[0]
  const defaultProfileImage = require("./images/placeholder.png")

  // useEffect(() => {
  //   fetch()
  // }, []);
  
  return (
    <>
    {/* Pass user data in object ProfileTitleSection. 
    name = Full Name
    joinDate = Date Joined by the user,
    and Image = Profile Image URL */}

      <ProfileTitleSection
      name = { payload.display_name }
      joinDate = { payload.date_join }
      Image = { defaultProfileImage } 
      />

      <div className="cards">
        {
          Object.keys(payload).map(k => 
            <div>
              {k}: {payload[k]}
            </div>
          )
        }
        {/*<div className="CardGroup">
          <ImageCard
          link = "../"
          title="Donate to the cause"
          text="Every Penny Counts"
          Image = {require("./images/coronavirus.jpg")}
          />
          <ImageCard
          link = "../"
          title="Record Data"
          text="Track using devices"
          Image = {require("./images/progress.jpg")}
          />
          <ImageCard
          link = "../"
          title="Donate to the cause"
          text="Every Penny Counts"
          Image = {require("./images/graphs.jpg")}
          />
          <ImageCard
          link = "../"
          title="Donate to the cause"
          text="Every Penny Counts"
          Image = {require("./images/coronavirus.jpg")}
          />
        </div>*/}
      </div>
    </>
  )
};