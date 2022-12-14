import React from "react";
import Sidebar from "../../components/Sidebar";

const Notification = () => {
  return (
    <div className="h-screen">
      <div className="max-w-[186px] overflow-hidden">
        <Sidebar active="notification" />
      </div>
    </div>
  );
};

export default Notification;
