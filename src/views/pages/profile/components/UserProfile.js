import React, { useEffect, useState } from "react";
import "../profile.scss";

export function UserProfile() {
  const userNavBar = ["these", "are", "some", "links"]

  return(
    <div id="user-profile">
      {/*<div className="row">
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
                      userNavBar.map(item => 
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
            ME
          </div>
          <div className="col-md-12 col-lg-6">
            CONTENT
          </div>
          <div className="col-md-12 col-lg-3">
            SOME OTHER STUFF
          </div>
        </div>
      </div>*/}
      
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