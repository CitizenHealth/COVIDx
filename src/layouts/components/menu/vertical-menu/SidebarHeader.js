import React, { Component } from "react"
import { NavLink } from "react-router-dom"
import { Disc, X, Circle } from "react-feather"
import classnames from "classnames"
class SidebarHeader extends Component {
  render() {
    let {
      toggleSidebarMenu,
      activeTheme,
      collapsed,
      toggle,
      sidebarVisibility,
      menuShadow
    } = this.props
    return (
      <div className="navbar-header">
        <ul className="nav navbar-nav flex-row">
          <li className="nav-item mr-auto">
            <NavLink to="/" className="navbar-brand">
              <h2 className="brand-text mb-0">COVIDx</h2>
            </NavLink>
          </li>
        </ul>
        <div
          className={classnames("shadow-bottom", {
            "d-none": menuShadow === false
          })}
        />
      </div>
    )
  }
}

export default SidebarHeader
