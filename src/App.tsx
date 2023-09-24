import React from 'react';
import { Suspense, lazy, useState } from "react";
import './App.css';
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import Loading from './components/helpComponents/Loading';
import NewsPage from './components/newspage/NewsPage';
import Header from './components/header/Header';
import SubNews from './components/subNews/SubNews';

const HeaderLazy = lazy(() =>
  import("./components/header/Header")
);
const NewsPageLazy = lazy(() =>
  import("./components/newspage/NewsPage")
);
const SubNewsLazy = lazy(() =>
  import("./components/subNews/SubNews")
);

const  App: React.FC =()=> {
  const [showSidebar , setShowSideBar]=useState<boolean>(false);
  return (
    <>
        <Routes>
           {/* <Route
              path="/"
              element={
                // <Suspense fallback={<Loading />}>
                  // <HeaderLazy setShowSideBar={setShowSideBar} showSidebar={showSidebar} />
                // </Suspense>
                <Header setShowSideBar={setShowSideBar} showSidebar={showSidebar}/>
              }
            > */}
              <Route index element={
                <Suspense fallback={<Loading />}>
                  <NewsPageLazy  />
                </Suspense>
              }/>
               
               <Route path='/world' element={<SubNews/>}  />
               

            {/* </Route> */}

           
           
        </Routes>
    </>
  );
}

export default App;
