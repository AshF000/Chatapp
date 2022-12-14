import React, { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const Userlist = () => {
  const auth = getAuth();
  const db = getDatabase();

  let [userlist, setUserlist] = useState([]);
  let [sentrequest, setSentrequest] = useState([]);
  let [blockedusers, setBlockedusers] = useState([]);
  let [requestaccept, setRequestaccept] = useState([]);

  let handlefriendrequest = (item) => {
    set(push(ref(db, "friendrequest")), {
      sendername: auth.currentUser.displayName,
      senderid: auth.currentUser.uid,
      receivername: item.name,
      receiverid: item.id,
    })
  };

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.key !== auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserlist(arr);
    });
  }, []);

  useEffect(() => {
    const requestsentRef = ref(db, "friendrequest/");
    onValue(requestsentRef, (snapshot) => {
      let requestsentArr = [];
      snapshot.forEach((item) => {
        requestsentArr.push(item.val().receiverid + item.val().senderid);
      });
      setSentrequest(requestsentArr);
    });
  }, []);

  useEffect(() => {
    const requestacceptRef = ref(db, "friends/");
    onValue(requestacceptRef, (snapshot) => {
      let requestacceptArr = [];
      snapshot.forEach((item) => {
        requestacceptArr.push(item.val().receiverid + item.val().senderid);
      });
      setRequestaccept(requestacceptArr);
    });
  }, []);

  useEffect(() => {
    const blockRef = ref(db, "blocklist/");
    onValue(blockRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().blockerid ||
          auth.currentUser.uid == item.val().blockedid
        ) {
          blockArr.push(item.val().blockerid + item.val().blockedid);
        }
      });
      setBlockedusers(blockArr);
    });
  }, []);

  // useEffect(() => {
  //   const blockRef = ref(db, "blocklist/");
  //   onValue(blockRef, (snapshot) => {
  //     let blockArr = [];
  //     snapshot.forEach((item) => {
  //       if (
  //         auth.currentUser.uid == item.val().blockerid ||
  //         auth.currentUser.uid == item.val().blockedid
  //       ) {
  //         blockArr.push(item.val().blockerid + item.val().blockedid);
  //       }
  //     });
  //     setBlockedusers(blockArr);
  //   });
  // }, []);

  return (
    <div className="w-full h-[426px] overflow-hidden hover:overflow-y-auto shadow-[0px_5px_4px_rgba(0,0,0,0.15)] rounded-[20px] py-[15px] px-[22px] ">
      <div className="items-center flex justify-between">
        <h3 className="font-popin font-semibold text-[20px] inline-block">
          Userlist
        </h3>
        <BiDotsVerticalRounded className="text-primary text-[24px] inline-block" />
      </div>
      {userlist.map((item) => (
        <div className="w-full flex items-center border-[#00000050] border-b py-[13px]">
          <picture className="w-[54.0px] h-[54.09px] rounded-full mr-[5px]  !w-[18%]">
            <img src={item.photoURL} alt="DP" />
          </picture>
          <div className="font-popin !w-[52%]">
            <h4 className="font-semibold text-[14px]">{item.name}</h4>
            <p className="font-medium text-[12px] text-[#4d4d4dbf] truncate">
              {item.email}
            </p>
          </div>
          {requestaccept.includes(item.id + auth.currentUser.uid) ||
          requestaccept.includes(auth.currentUser.uid + item.id) ? (
            <button className="ml-auto font-popin font-semibold text-[14px] xl:text-[15px] text-primary bg-gray-300 px-[6px] rounded-[5px] !max-w-[26%]">
              Message
            </button>
          ) : sentrequest.includes(item.id + auth.currentUser.uid) ||
            sentrequest.includes(auth.currentUser.uid + item.id) ? (
            <button className="ml-auto font-popin font-semibold text-[14px] xl:text-[15px] text-white bg-yellow-400 px-[6 px] rounded-[5px] !max-w-[25%]">
              Pending
            </button>
          ) : blockedusers.includes(item.id + auth.currentUser.uid) ||
            blockedusers.includes(auth.currentUser.uid + item.id) ? (
            <button
              className="ml-auto font-popin font-semibold text-[14px] xl:text-[15px] text-white bg-gray-400 px-[8px] rounded-[5px] !max-w-[25%] cursor-not-allowed"
              disabled
            >
              x_x
            </button>
          ) : (
            <button
              className="ml-auto font-popin font-semibold text-[14px] xl:text-[15px] text-white bg-primary px-[8px] rounded-[5px] !max-w-[25%]"
              onClick={() => handlefriendrequest(item)}
            >
              Add +
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Userlist;
