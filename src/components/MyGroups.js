import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
  DataSnapshot,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const MyGroups = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [grouplist, setGrouplist] = useState([]);
  let [showinfo, setShowinfo] = useState(false);
  let [grouprequestlist, setGrouprequestlist] = useState([]);

  useEffect(() => {
    const groupRef = ref(db, "groups/");
    onValue(groupRef, (snapshot) => {
      let groupArr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid == auth.currentUser.uid) {
          groupArr.push({ ...item.val(), id: item.key });
        }
      });
      setGrouplist(groupArr);
    });
  }, []);

  let handleShowgrouprequest = (item) => {
    setShowinfo(!showinfo);
    const grouprequestRef = ref(db, "groupjoinrequest/");
    onValue(grouprequestRef, (snapshot) => {
      let grouprequestArr = [];
      snapshot.forEach((reqitem) => {
        if (
          reqitem.val().adminid == auth.currentUser.uid &&
          reqitem.val().groupid == item.id
        ) {
          grouprequestArr.push({ ...reqitem.val(), id: reqitem.key });
        }
      });
      setGrouprequestlist(grouprequestArr);
    });
  };

  let handleJoinreqreject = (item) => {
    remove(ref(db, "groupjoinrequest/" + item.id));
  };

  let handleJoinreqaccept = (item) => {
    set(push(ref(db, "groupmembers")), {
      membername: item.username,
      memberid: item.userid,
      memberdp: item.userdp,
      groupname: item.groupname,
      groupid: item.id,
      grouptag: item.grouptag,
      adminname: item.adminname,
      adminid: item.adminid,
    }).then(() => {
      remove(ref(db, "groupjoinrequest/" + item.id));
    });
  };

  return (
    <div className="w-full h-[430px] max-h-[430px] overflow-hidden hover:overflow-y-auto shadow-[0px_5px_4px_rgba(0,0,0,0.15)] rounded-[20px] py-[15px] px-[22px] mt-[43px]">
      <div className="items-center flex justify-between">
        <h3 className="font-popin font-semibold text-[20px] inline-block">
          My Groups
        </h3>
        {showinfo ? (
          <button
            onClick={() => setShowinfo(false)}
            className="text-primary text-[17px] inline-block font-bold font-nunito"
          >
            Back
          </button>
        ) : (
          <BiDotsVerticalRounded className="text-primary text-[24px] inline-block" />
        )}
      </div>
      {showinfo ? (
        <>
          <h2 className="font-bold font-nunito text-center text-lg my-2">
            Join request list
          </h2>
          {grouprequestlist.map((item) => (
            <div className="">
              <div className="w-full flex items-center border-[#00000050] border-b py-[13px]">
                <picture className="w-[52.18px] h-[52.18px] rounded mr-[10px] ">
                  <img src={item.userdp} alt="DP" />
                </picture>
                <div className="font-popin !w-[52%]">
                  <h4 className="font-semibold text-[14px]">{item.username}</h4>
                  <p className="font-medium text-[12px] text-[#4d4d4dbf] truncate ">
                    request for : {item.groupname}
                  </p>
                </div>
                <div className="ml-auto flex">
                  <AiFillCheckCircle
                    onClick={() => handleJoinreqaccept(item)}
                    className="text-green-600 text-3xl"
                  />
                  <MdCancel
                    onClick={() => handleJoinreqreject(item)}
                    className="text-red-600 text-3xl text-right "
                  />
                </div>
              </div>
              {/* <div className="flex justify-evenly">
              <button
                // onClick={handleCreategroup}
                className="font-nunito py-[5px] px-[30px]  text-center bg-primary text-white rounded-[8.71px] font-semibold text-[15px] my-[10px] shadow-xl shadow-primary-500/80"
              >
                Create
              </button>
              <button
                onClick={() => setShowinfo(false)}
                className="font-nunito py-[5px] px-[30px]  text-center bg-primary text-white rounded-[8.71px] font-semibold text-[15px] my-[10px] shadow-xl shadow-primary-500/80"
              >
                Back
              </button>
            </div> */}
            </div>
          ))}
        </>
      ) : (
        <div className="">
          {grouplist.map((item) => (
            <div className="w-[95%] flex items-center border-[#00000050] border-b py-[13px]">
              <picture className="w-[52.18px] h-[54.09px] rounded mr-[10px]">
                <img src="images/GrpReq-1.webp" alt="DP" />
              </picture>
              <div className="font-popin">
                <h4 className="font-semibold text-[14px]">{item.groupname}</h4>
                <p className="font-medium text-[12px] text-[#4d4d4dbf]">
                  {item.grouptag}
                </p>
              </div>
              <div className="flex flex-col ml-auto w-[30%]">
                <button
                  className="font-popin font-semibold text-[14px] xl:text-[15px] text-white bg-primary rounded-[5px]"
                  onClick={() => handleShowgrouprequest(item)}
                >
                  Info
                </button>
                <button className="mt-1 font-popin font-semibold text-[14px] xl:text-[15px] text-white bg-primary rounded-[5px] ">
                  Members
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGroups;
