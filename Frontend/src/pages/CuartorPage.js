import React from "react";
import CuratorSideBar from "../components/curator/CuratorSideBar";
import { Outlet } from "react-router-dom";
import CuratorHeader from "../components/curator/CuratorHeader";

const CuartorPage = () => {
    return (
        <div className="flex h-screen">
          <CuratorSideBar/>
          <div className="flex-1 flex flex-col">
            <CuratorHeader /> 
            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </main>
    
          </div>
        </div>
      );
    };

export default CuartorPage