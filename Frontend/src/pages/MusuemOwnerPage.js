import React from "react";
import MuseumOwnerSideBar from "../components/museumOwner/MuseumOwnerSideBar";
import { Outlet } from "react-router-dom";
import MuseumOwnerHeader from "../components/museumOwner/MuseumOwnerHeader";
import Footer from "../components/common/Footer";

const MusuemOwnerPage = () => {
    return (
        <div className="flex h-screen">
          <MuseumOwnerSideBar/>
          <div className="flex-1 flex flex-col">
            <MuseumOwnerHeader /> 
            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </main>
            <Footer/>
          </div>
        </div>
      );
    };

export default MusuemOwnerPage