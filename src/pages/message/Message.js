import React from "react";
import Sidebar from "../../components/Sidebar";

const Message = () => {
  return (
    <div className="h-screen">
      <div className="max-w-[186px] overflow-hidden">
        <Sidebar active="message" />
      </div>
    </div>
  );
};

export default Message;
