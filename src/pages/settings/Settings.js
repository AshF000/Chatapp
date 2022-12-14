import React from "react";
import Sidebar from "../../components/Sidebar";

const Settings = () => {
  return (
    <div className="h-screen">
      <div className="max-w-[186px] overflow-hidden">
        <Sidebar active="settings" />
      </div>
    </div>
  );
};

export default Settings;
