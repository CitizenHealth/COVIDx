import React, { useEffect, useState } from "react";
import "../profile.scss";

export function UserProfile() {
  const userNavBar = ["these", "are", "some", "links"]

  return(
    <div id="user-profile">
      <div className="profile-info">
        {/*<p>
          We'd like this info as accurate as possible.
        </p>*/}
        <div className="row">
          <div className="col-md-12 col-lg-2" />
          <div className="col-md-12 col-lg-8">
            <div className="card">
              <div className="card-body">
                some user data
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-2" />             
        </div>
      </div>
    </div>
  )
}