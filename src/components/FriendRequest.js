import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  setPriority,
  remove,
} from "firebase/database";
import { getAuth, setPersistence } from "firebase/auth";

const FriendRequest = () => {
  const auth = getAuth();
  const db = getDatabase();

  let [friendrequestlist, setFriendrequestlist] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "friendrequest/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid == auth.currentUser.uid) {
          arr.push({ ...item.val(), id: item.key });
        }
      });  
      setFriendrequestlist(arr);
    });
  }, []);

  let handleacceptfriendrequest = (item) => {
    set(push(ref(db, "friends/")), {
      id: item.id,
      sendername: item.sendername,
      senderid: item.senderid,
      receivername: item.receivername,
      receiverid: item.receiverid,
      date: `${new Date().getDate()}/${
        new Date().getMonth()+1
      }/${new Date().getFullYear()}`,
    }).then(() => {
      remove(ref(db, "friendrequest/" + item.id));
      console.log("request remove hoise")
    }).then(() => {
      console.log("push hoise");
    });
  };

  return (
    <div className="w-full max-h-[430px] overflow-hidden hover:overflow-y-auto shadow-[0px_5px_4px_rgba(0,0,0,0.15)] rounded-[20px] py-[15px] px-[22px] mt-[43px]">
      <div className="items-center flex justify-between">
        <h3 className="font-popin font-semibold text-[18px] xl:text-[20px] inline-block">
          Friend Request
        </h3>
        <BiDotsVerticalRounded className="text-primary text-[24px] inline-block" />
      </div>
      {friendrequestlist.map((item) => (
        <div className="flex items-center border-[#00000050] border-b py-[13px]">
          <picture className="w-[55px] h-[55px] xl:w-[70px] xl:h-[70px] rounded mr-[14px] !w-[18%]">
            <img src="images/GrpReq-1.webp" alt="DP" />
          </picture>
          <div className="font-popin !w-[52%]">
            <h4 className="font-semibold text-[16px] xl:text-[18px]">
              {console.log("req to ashche")}
              {item.sendername}
            </h4>
            <p className="font-medium text-[12px] xl:text-[14px] text-[#4d4d4dbf] truncate ">
              {item.senderid}
            </p>
          </div>
          <button
            onClick={() => handleacceptfriendrequest(item)}
            className="ml-auto font-popin font-semibold text-[16px] xl:text-[20px] text-white bg-primary px-[8px] rounded-[5px] !max-w-[25%]"
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
