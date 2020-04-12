import React, { useEffect, useState } from "react";
import "../profile.scss";


const ProfileTitleSection = props => (
  <div className="titleSection">
    <div className="titleSectionGroup">
      <img src={props.Image} />
      <div className="titleInfo">
          <h1>{props.name}</h1>
          <p>{props.joinDate}</p>
          {/* <button>Edit Profile</button> */}
      </div>
    </div>
  </div>
    
)
export default ProfileTitleSection