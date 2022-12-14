import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const Friends = () => {
  const auth = getAuth();
  const db = getDatabase();

  let [newfriends, setNewfriends] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friends/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          auth.currentUser.uid == item.val().senderid ||
          auth.currentUser.uid == item.val().receiverid
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setNewfriends(arr);
    });
  }, []);

  let handleblocking = (item) => {
    auth.currentUser.uid == item.senderid
      ? set(push(ref(db, "blocklist")), {
          blockername: item.sendername,
          blockerid: item.senderid,
          blockedname: item.receivername,
          blockedid: item.receiverid,
        }).then(() => {
          remove(ref(db, "friends/" + item.id));
        })
      : set(push(ref(db, "blocklist")), {
          blockername: item.receivername,
          blockerid: item.receiverid,
          blockedname: item.sendername,
          blockedid: item.senderid,
        }).then(() => {
          remove(ref(db, "friends/" + item.id));
        });
  };

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
          Friends
        </h3>
        <BiDotsVerticalRounded className="text-primary text-[24px] inline-block" />
      </div>
      {newfriends.map((item) => (
        <div className="w-[95%] flex items-center border-[#00000050] border-b py-[13px]">
          <picture className="w-[52.18px] h-[52.18px] rounded mr-[10px]  !w-[18%]">
            <img src="images/GrpReq-1.webp" alt="DP" />
          </picture>
          <div className="font-popin !w-[52%]">
            <h4 className="font-semibold text-[14px]">
              {item.senderid == auth.currentUser.uid
                ? item.receivername
                : item.sendername}
            </h4>
            <p className="font-medium text-[12px] text-[#4d4d4dbf] truncate ">
              {item.senderid == auth.currentUser.uid
                ? item.receiverid
                : item.senderid}
            </p>
          </div>
          <button
            className="ml-auto font-popin font-semibold text-[14px] xl:text-[15px] text-white bg-[red] px-[8px] rounded-[5px] !max-w-[25%]"
            onClick={() => handleblocking(item)}
          >
            Block
          </button>
        </div>
      ))}
    </div>
  );
};

export default Friends;
