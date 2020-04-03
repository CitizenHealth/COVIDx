import React, { useEffect, useState } from "react";
import "../profile.scss";

export function UserProfile() {
  const navBarItems = ["these", "are", "some", "items"]

  return(
    <div id="user-profile">
      <div className="row">
        <div className="col-sm-12">
          <div className="profile-header mb-2">
            <div className="position-relative">
              <div className="cover-container">
                <img 
                  src="https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/cover.21a4037c.jpg" 
                  alt="CoverImg" 
                  class="img-fluid bg-cover w-100 rounded-0" />
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center profile-header-nav nav-bar-custom">
              <nav className="w-100 pr-0 navbar navbar-expand-sm">
                <button aria-label="Toggle navigation" type="button" className="navbar-toggler">

                </button>
                <div className="collapse navbar-collapse">
                  <ul className="justify-content-around w-75 ml-sm-auto navbar-nav nav">
                    {
                      navBarItems.map(item => 
                        <li className="px-sm-0 nav-item">
                          <a>{ item }</a>
                        </li>
                      )
                    }
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div id="profile-info">
        <div className="row">
          <div className="col-md-12 col-lg-3">
            COLUMN 1
          </div>
          <div className="col-md-12 col-lg-6">
            COLUMN 2
          </div>
          <div className="col-md-12 col-lg-3">
            COLUMN 3
          </div>
        </div>
      </div>
    </div>
  )
}