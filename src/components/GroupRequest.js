import React from "react";
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
import { toast, ToastContainer } from "react-toastify";

const GroupRequest = () => {
  const auth = getAuth();
  const db = getDatabase();

  let [creategroup, setCreategroup] = useState(false);
  let [emailerr, setEmailErr] = useState("");
  let [groupname, setGroupname] = useState("");
  let [grouptag, setGrouptag] = useState("");
  let [grouplist, setGrouplist] = useState([]);

  let handleCreategroup = () => {
    set(push(ref(db, "groups")), {
      groupname: groupname,
      grouptag: grouptag,
      adminname: auth.currentUser.displayName,
      adminid: auth.currentUser.uid,
    }).then((item) => {
      setCreategroup(false);
    });
  };

  let handleJoingroup = (item) => {
    set(push(ref(db, "groupjoinrequest/")), {
      adminid: item.adminid,
      adminname: item.adminname,
      groupid: item.groupid,
      groupname: item.groupname,
      grouptag: item.grouptag,
      userid: auth.currentUser.uid,
      username: auth.currentUser.displayName,
      userdp: auth.currentUser.photoURL,
    });
  };

  useEffect(() => {
    const groupRef = ref(db, "groups/");
    onValue(groupRef, (snapshot) => {
      let groupArr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid !== auth.currentUser.uid) {
          groupArr.push({ ...item.val(), groupid: item.key });
        }
      });
      setGrouplist(groupArr);
    });
  }, []);

  return (
    <div className="w-full h-[335px] overflow-hidden hover:overflow-y-auto scrollbar-hide shadow-[0px_5px_4px_rgba(0,0,0,0.15)] rounded-[20px] py-[15px] px-[22px] mt-[30px]">
      <ToastContainer position="bottom-center" theme="dark" autoClose={1500} />
      <div className="items-center flex justify-between ">
        <h3 className="font-popin font-semibold text-[18px] xl:text-[20px] inline-block">
          Group list
        </h3>
        <button
          className="ml-auto font-popin font-semibold text-[14px] xl:text-[15px] text-white bg-primary px-[8px] rounded-[5px]"
          onClick={() => setCreategroup(!creategroup)}
        >
          {creategroup ? "Cancle" : "Create group"}
        </button>
      </div>
      {creategroup ? (
        <>
          <h2 className="font-bold font-nunito text-center text-lg my-2">
            Create New Group
          </h2>
          <div className="">
            <div className="relative">
              <label className="text-dPrimary/70  font-semibold text-[13.76px] bg-white px-[20px] ml-[-20px]">
                Group Name
              </label>
              <input
                onChange={(e) => setGroupname(e.target.value)}
                type="text"
                className="border-b-[1.72px] border-solid border-dPrimary/30 w-full py-[10px] mb-[15px] pr-[10px] text-dPrimary font-semibold text-[15px] outline-0"
                placeholder="Enter new group name"
              />
            </div>
            <div className="relative">
              <label className="text-dPrimary/70  font-semibold text-[13.76px] bg-white px-[20px] ml-[-20px]">
                Group Tagline
              </label>
              <input
                onChange={(e) => setGrouptag(e.target.value)}
                type="text"
                className="border-b-[1.72px] border-solid border-dPrimary/30 w-full py-[10px] mb-[15px] pr-[10px] text-dPrimary font-semibold text-[15px] outline-0"
                placeholder="Enter new group tagline"
              />
            </div>
            <div className="flex justify-around">
              <button
                onClick={handleCreategroup}
                className="font-nunito py-[5px] px-[20px] text-center bg-primary sm:w-[50%] text-white rounded-[8.71px] font-semibold text-[15px] my-[10px] shadow-xl shadow-primary-500/80 !mx-auto"
              >
                Create
              </button>
            </div>
          </div>
        </>
      ) : (
        grouplist.map((item) => (
          <div className="">
            <div className="flex items-center border-[#00000050] border-b py-[13px]">
              <picture className="w-[55px] h-[55px] xl:w-[70px] xl:h-[70px] rounded mr-[14px]">
                <img src="images/defaul-dp.webp" alt="DP" />
              </picture>
              <div className="font-popin !w-[52%]">
                <h4 className="font-semibold text-[16px] xl:text-[18px] truncate">
                  {item.groupname}{" "}
                  <span className="text-[12px] font-semibold truncate">
                    (Admin:{item.adminname})
                  </span>
                </h4>
                <p className="font-medium text-[12px] xl:text-[14px] text-[#4d4d4dbf] truncate">
                  {item.grouptag}
                </p>
              </div>
              <button
                className="ml-auto font-popin font-semibold text-[16px] xl:text-[20px] text-white bg-primary px-[8px] rounded-[5px]"
                onClick={() => handleJoingroup(item)}
              >
                Join
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GroupRequest;
