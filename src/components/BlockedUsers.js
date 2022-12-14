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

const BlockedUsers = () => {
  const auth = getAuth();
  const db = getDatabase();

  let [blockedusers, setBlockedusers] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "blocklist/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().blockerid == auth.currentUser.uid) {
          arr.push({
            id: item.key,
            block: item.val().blockedname,
            blockid: item.val().blockedid,
            blockerid: item.val().blockerid,
            blcokedid: item.val().blockedid,
          });
        } else {
          arr.push({
            id: item.key,
            block: item.val().blockername,
            blockid: item.val().blockerid,
            blockerid: item.val().blockerid,
            blcokedid: item.val().blockedid,
          });
        }
      });
      setBlockedusers(arr);
    });
  }, []);

  let handleunblocking = (item) => {
    remove(ref(db, "blocklist/" + item.id))
  };

  // set(push(ref(db, "friends/")), {
  //   id: item.id,
  //   sendername: item.sendername,
  //   senderid: item.senderid,
  //   receivername: item.receivername,
  //   receiverid: item.receiverid,
  // })
  //   .then(() => {
  //     remove(ref(db, "blocklist/" + item.id));
  //   })

  return (
    <div className="w-full max-h-[430px] overflow-hidden hover:overflow-y-auto shadow-[0px_5px_4px_rgba(0,0,0,0.15)] rounded-[20px] py-[15px] px-[22px] mt-[43px]">
      <div className="items-center flex justify-between">
        <h3 className="font-popin font-semibold text-[20px] inline-block">
          Blocked Users
        </h3>
        <BiDotsVerticalRounded className="text-primary text-[24px] inline-block" />
      </div>
      {blockedusers.map((item) => (
        <div className="w-[95%] flex items-center border-[#00000050] border-b py-[13px]">
          <picture className="w-[52.18px] h-[54.09px] rounded mr-[10px] !w-[18%]">
            <img src="images/GrpReq-1.webp" alt="DP" />
          </picture>
          <div className="font-popin  !w-[52%]">
            <h4 className="font-semibold text-[14px]">{item.block}</h4>
            <p className="font-medium text-[12px] text-[#4d4d4dbf] truncate">
              {item.blockid}
            </p>
          </div>

          {item.blockerid == auth.currentUser.uid && (
            <button
              className="ml-auto font-popin font-semibold text-[14px] text-white bg-[green] px-[4px] rounded-[5px] !max-w-[25%]"
              onClick={() => handleunblocking(item)}
            >
              Unblock
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlockedUsers;
