import React, { useEffect, useState } from "react";
import StatisticsCard from "components/@vuexy/statisticsCard/StatisticsCard";
import { UserProfile } from "./components/UserProfile";
import  ProfileTitleSection from "./components/TitleSection";
import ImageCard from "components/imageCard/imageCard.js"
export default function Profile() {
  const [userData, setUserData] = useState(null)

  // useEffect(() => {
  //   fetch()
  // })

  return (
    <>
      <ProfileTitleSection
      name = "Huzaifa Ahmad"
      joinDate = "Joined April 8, 2020"
      Image = {require("./images/placeholder.png")} 
      />

      <div className="cards">
        <div className="CardGroup">
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
        </div>

      </div>
    </>
  )
};