import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    // id: "home",
    // title: "Home",
    // type: "item",
    // icon: <Icon.Home size={20} />,
    // permissions: ["admin", "editor"],
    // navLink: "/"
  },
  {
    // id: "page2",
    // title: "Page 2",
    // type: "item",
    // icon: <Icon.File size={20} />,
    // permissions: ["admin", "editor"],
    // navLink: "/page2"
  },
  {
    id: "map",
    title: "Heat Map",
    type: "item",
    // permissions: [] // TODO: what are the options here?
    navLink: "/map"
  },
  {
    id: "profile",
    title: "My Profile",
    type: "item",
    // permissions: [] // TODO: what are the options here?
    navLink: "/profile"
  }
]

export default navigationConfig
