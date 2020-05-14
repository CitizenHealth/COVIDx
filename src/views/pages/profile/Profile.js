import React, { useEffect, useState } from "react";
import StatisticsCard from "components/@vuexy/statisticsCard/StatisticsCard";
import ProfileTitleSection from "./components/TitleSection";
import { Card, CardBody } from "reactstrap";


export default function Profile(props) {
  const defaultProfileImage = require("./images/placeholder.png")

  return (
    <>
      {/* <ProfileTitleSection */}
      {/* name = { payload.display_name } */}
      {/* joinDate = { payload.date_join } */}
      {/* Image = { defaultProfileImage }  */}
      {/* /> */}
      {/* <div className="content-card"> */}
      {/*   <Card className="card"> */}
      {/*     <CardBody className="card-info"> */}
      {/*       { */}
      {/*         Object.keys(payload).map(k =>  */}
      {/*           <div>{ k }:</div>  */}
      {/*           // <div>{payload[k]}</div> */}
      {/*         ) */}
      {/*       } */}
      {/*     </CardBody> */}
      {/*   </Card> */}
      {/* </div> */}
    </>
  )
};