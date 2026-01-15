import React from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import DisplayFood from "../../components/DisplayFood/DisplayFood";
import AppDownload from "../../components/AppDownload/AppDownload";

function Home() {
  const [catagory, setCatagory] = useState("All");

  return (
    <div>
      
      <Header />
      <ExploreMenu catagory={catagory} setCatagory={setCatagory} />
      <DisplayFood catagory={catagory} />
      <AppDownload />
    </div>
  );
}

export default Home;
