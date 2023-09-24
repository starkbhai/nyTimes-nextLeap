import React, { useState } from "react";
import Header from "../header/Header";

const SubNews: React.FC = () => {
  const [showSidebar , setShowSideBar]=useState<boolean>(false);
   function MouseOver(event:React.MouseEvent<HTMLDivElement>) {
    setShowSideBar(false)
   }
  return (
    <div onMouseOver={MouseOver}>
      <Header setShowSideBar={setShowSideBar} showSidebar={showSidebar} />
    </div>
  );
};

export default SubNews;
