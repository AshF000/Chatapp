import React, { useEffect, useState } from "react";
import BlockedUsers from "../../components/BlockedUsers";
import Userlist from "../../components/Userlist";
import MyGroups from "../../components/MyGroups";
import Friends from "../../components/Friends";
import GroupRequest from "../../components/GroupRequest";
import FriendRequest from "../../components/FriendRequest";
import Search from "../../components/Search";
import Sidebar from "../../components/Sidebar";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let [emailverify, setEmailverify] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
    } else if (auth.currentUser.emailVerified) {
      setEmailverify(true);
    } else if (!auth.currentUser.emailVerified) {
      setEmailverify(false);
      toast("Check email to found verify link !!!");
    }
  });

  let handlelinksend = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("CONFIRMATION EMAIL SEND");
      toast("A new link has been sent to your email.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    });
  };

  return (
    <>
      {emailverify ? (
        <div className=" xl:flex py-2.5 xl:p-0  ">
          {/* <div className="w-full xl:max-w-[186px] overflow-hidden fixed left-0 bottom-0"> */}
          <div className="w-full h-[100%] xl:max-w-[186px] overflow-hidden fixed bottom-[-93.5%] xl:bottom-0">
            <Sidebar active="home" />
          </div>

          {/* <div className="xl:w-[427px] xl:max-w-[427px] xl:ml-[43px] xl:!ml-[229px] mx-4 xl:mx-0"> */}
          <div className="xl:w-[427px] xl:max-w-[427px] xl:ml-[243px] mx-4 xl:mx-0">
            <Search />
            <GroupRequest />
            <FriendRequest />
          </div>
          <div className="xl:w-[344px] xl:max-w-[344px] xl:ml-[40px] mt-5 xl:mt-0 mx-4 xl:mx-0">
            <Friends />
            <MyGroups />
          </div>
          <div className="xl:w-[344px] xl:max-w-[344px] xl:ml-[40px] mt-5 xl:mt-0 mb-[70px] xl:mb-0 mx-4 xl:mx-0">
            <Userlist />
            <BlockedUsers />
          </div>
        </div>
      ) : (
        <div className="bg-primary w-full h-screen flex flex-col justify-center items-center">
          <ToastContainer
            position="bottom-center"
            theme="dark"
            autoClose={1500}
          />
          <h1 className="animate-pulse font-nunito font-bold text-white text-5xl">
            Please verify your email then try again!!!
          </h1>
          <div className="flex mt-10 align-baseline">
            <button
              className="p-3 bg-white rounded font-nunito font-bold text-lg mx-3 text-dPrimary  "
              onClick={handlelinksend}
            >
              Send link again
            </button>
            <p className="text-white text-lg font-semibold p-3 ">Or</p>
            <Link
              className="p-3 bg-white rounded font-nunito font-bold text-lg mx-3 text-dPrimary  "
              to="/login"
            >
              Go back
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
