import React, { useEffect, useState } from "react";
import StatisticsCard from "components/@vuexy/statisticsCard/StatisticsCard";
import { UserProfile } from "./components/UserProfile";

export default function Profile() {
  const [userData, setUserData] = useState(null)

  // useEffect(() => {
  //   fetch()
  // })

  return (
    <>
      <h2 className="content-header-title mb-0">About Me</h2>
      <div>pls provide as much info as possible</div>
      <UserProfile />
    </>
  )
};