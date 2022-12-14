import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
import {
  AiOutlineHome,
  AiFillMessage,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Sidebar = ({ active }) => {
  const auth = getAuth();
  let navigate = useNavigate();
  const storage = getStorage();

  let [showuploaddp, setShowuploaddp] = useState(false);
  let [newdp, setNewdp] = useState("");
  let [newdpname, setNewdpname] = useState("");
  let [previmg, setPrevimg] = useState("");
  let [dpuploader, setDpuploader] = useState(false);
  const [cropper, setCropper] = useState();
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setPrevimg(cropper.getCroppedCanvas().toDataURL());
  };

  let handleSignout = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => {
          toast("Successfully signed out");
        }, 100);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch(() => {
        toast("An error appeared!!!");
      });
  };

  let handleSelectdp = (e) => {
    setNewdpname(e.target.files[0].name);
    console.log(e.target.files[0].name);

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setNewdp(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    const storageRef = ref(storage, newdpname);
    if (typeof cropper !== "undefined") {
      setDpuploader(true);
      cropper.getCroppedCanvas().toDataURL();
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("update hoise");
              setTimeout(() => {
                setDpuploader(false);
                setShowuploaddp(false);
              }, 1000);
              setTimeout(() => {
                toast("Profile picture updated");
              }, 2000);
            })
            .catch((error) => {
              setDpuploader(false);
              // An error occurred
              // ...
            });
        });
      });
    }
  };

  let handleClearprev = () => {
    setNewdp("");
    setPrevimg("");
  };

  return (
    <div className=" bg-primary xl:h-screen xl:py-[38px] xl:rounded-[20px] flex items-center  xl:flex-col  xl:static xl:w-full overflow-hidden ">
      <ToastContainer position="bottom-center" theme="dark" autoClose={1500} />
      <div className=" h-[30%] xl:w-full ml-2 xl:ml-0 xl:px-[43px] z-[4]">
        <div className="relative group ">
          <picture className="">
            <img
              src={auth.currentUser.photoURL}
              alt="Owner's Profile Picture"
              className="border-2 xl:border-[4px] border-white border-solid w-[43px] h-[43px] sm:w-[55px] sm:h-[55px] xl:h-[100px] xl:w-[100px] rounded-full "
            />
          </picture>
          <div
            onClick={() => setShowuploaddp(true)}
            className=" shadow-lg cursor-pointer absolute xl:hidden justify-center items-center bottom-0 right-0 p-[1px] xl:p-[2px] xl:m-[4px] bg-white rounded-full xl:group-hover:flex border-primary border-[3px] border-solid hover:bg-primary hover:border-white hover:text-white "
          >
            <AiOutlineCloudUpload className="text-[12px] xl:text-lg rounded-full font-bold transition" />
          </div>
        </div>
        {/* <h2 className="font-nunito font-bold text-white mt-2 text-md text-center break-all">Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr.</h2> */}
        <h2 className="font-nunito font-bold text-white mt-2 text-md text-center hidden xl:block stroke-2">
          {auth.currentUser.displayName}
        </h2>
      </div>
      <div className=" h-[50%] xl:w-[73.5%] mx-auto flex xl:flex-col items-center sm:px-[25px] gap-x-5 xl:gap-0">
        <Link
          to="/"
          className={`${
            active == "home"
              ? "items-center flex flex-col w-full relative px-[5px] xl:px-[25px] py-[20px] xl:mb-[10px] z-[1] after:z-[-1] after:absolute after:bg-white after:top-0 after:left-0 after:right-0 xl:after:right-[-56%] after:bottom-0 after:rounded-b-[5px] xl:after:rounded-l-[10px] after:content-[''] before:absolute before:top-[-10%] xl:before:top-0 xl:before:bottom-0 before:left-0 xl:before:left-[147%] before:bg-primary before:px-2 before:right-[0%] xl:before:right-[-20%] before:py-2 before:rounded-lg before:z-[2] before:content-[''] before:shadow-md before:shadow-[rgba(0,0,0,0.25)] xl:before:shadow-lg xl:before:shadow-[rgba(0,0,0,0.50)]"
              : "px-[5px] py-[20px] xl:mb-[10px] block w-full text-center h-[25%]"
          }`}
        >
          <AiOutlineHome
            className={`${
              active == "home"
                ? "text-primary text-[28px] xl:text-[38px]"
                : "text-iconColor  text-[28px] xl:text-[38px] inline-block"
            }`}
          />
        </Link>
        <Link
          to="/message"
          className={`${
            active == "message"
              ? "items-center flex flex-col w-full relative px-[5px] xl:px-[25px] py-[20px] xl:mb-[10px] z-[1] after:z-[-1] after:absolute after:bg-white after:top-0 after:left-0 after:right-0 xl:after:right-[-56%] after:bottom-0 after:rounded-b-[5px] xl:after:rounded-l-[10px] after:content-[''] before:absolute before:top-[-10%] xl:before:top-0 xl:before:bottom-0 before:left-0 xl:before:left-[147%] before:bg-primary before:px-2 before:right-[0%] xl:before:right-[-20%] before:py-2 before:rounded-lg before:z-[2] before:content-[''] before:shadow-md before:shadow-[rgba(0,0,0,0.25)] xl:before:shadow-lg xl:before:shadow-[rgba(0,0,0,0.50)]"
              : "px-[5px] py-[20px] xl:mb-[10px] block w-full text-center h-[25%]"
          }`}
        >
          <AiFillMessage
            className={`${
              active == "message"
                ? "text-primary text-[28px] xl:text-[38px]"
                : "text-iconColor  text-[28px] xl:text-[38px] inline-block"
            }`}
          />
        </Link>
        <Link
          to="/notification"
          className={`${
            active == "notification"
              ? "items-center flex flex-col w-full relative px-[5px] xl:px-[25px] py-[20px] xl:mb-[10px] z-[1] after:z-[-1] after:absolute after:bg-white after:top-0 after:left-0 after:right-0 xl:after:right-[-56%] after:bottom-0 after:rounded-b-[5px] xl:after:rounded-l-[10px] after:content-[''] before:absolute before:top-[-10%] xl:before:top-0 xl:before:bottom-0 before:left-0 xl:before:left-[147%] before:bg-primary before:px-2 before:right-[0%] xl:before:right-[-20%] before:py-2 before:rounded-lg before:z-[2] before:content-[''] before:shadow-md before:shadow-[rgba(0,0,0,0.25)] xl:before:shadow-lg xl:before:shadow-[rgba(0,0,0,0.50)]"
              : "px-[5px] py-[20px] xl:mb-[10px] block w-full text-center h-[25%]"
          }`}
        >
          <IoNotificationsOutline
            className={`${
              active == "notification"
                ? "text-primary text-[28px] xl:text-[38px]"
                : "text-iconColor  text-[28px] xl:text-[38px] inline-block"
            }`}
          />
        </Link>
        <Link
          to="/settings"
          className={`${
            active == "settings"
              ? "items-center flex flex-col w-full relative px-[5px] xl:px-[25px] py-[20px] xl:mb-[10px] z-[1] after:z-[-1] after:absolute after:bg-white after:top-0 after:left-0 after:right-0 xl:after:right-[-56%] after:bottom-0 after:rounded-b-[5px] xl:after:rounded-l-[10px] after:content-[''] before:absolute before:top-[-10%] xl:before:top-0 xl:before:bottom-0 before:left-0 xl:before:left-[147%] before:bg-primary before:px-2 before:right-[0%] xl:before:right-[-20%] before:py-2 before:rounded-lg before:z-[2] before:content-[''] before:shadow-md before:shadow-[rgba(0,0,0,0.25)] xl:before:shadow-lg xl:before:shadow-[rgba(0,0,0,0.50)]"
              : "px-[5px] py-[20px] xl:mb-[10px] block w-full text-center h-[25%]"
          }`}
        >
          <FiSettings
            className={`${
              active == "settings"
                ? "text-primary text-[28px] xl:text-[38px]"
                : "text-iconColor text-[28px] xl:text-[38px] inline-block"
            }`}
          />
        </Link>
      </div>
      <div className="h-[20%] flex items-end">
        <Link
          onClick={handleSignout}
          className=" xl:w-full text-right xl:text-center py-[20px] xl:py-0 ml-auto mr-3.5 xl:m-0"
        >
          <MdOutlineLogout className="text-white text-[28px] xl:text-[38px] inline-block " />
        </Link>
      </div>

      {showuploaddp && (
        <div className=" fixed top-0 left-0 w-full h-screen bg-black/40 z-10 flex justify-center items-center ">
          <div className="rounded-xl shadow-xl shadow-white/20 p-9 bg-primary  flex flex-col justify-around items-center relative">
            <p
              className="drop-shadow-xl drop-shadow-white absolute top-0 right-0 h-8 w-8 text-center leading-8  font-nunito font-extrabold text-white cursor-pointer text-2xl m-1"
              onClick={() => setShowuploaddp(false)}
            >
              X
            </p>
            <h1 className="drop-shadow-xl drop-shadow-white text-5xl text-white font-nunito font-bold">
              Change profile picture
            </h1>
            {previmg ? (
              <picture>
                <img
                  className="border-2 xl:border-[4px] border-white border-solid w-[43px] h-[43px] sm:w-[55px] sm:h-[55px] xl:h-[100px] xl:w-[100px] rounded-full "
                  src={previmg}
                  alt=""
                />
              </picture>
            ) : (
              <picture>
                <img
                  className="border-2 xl:border-[4px] border-white border-solid w-[43px] h-[43px] sm:w-[55px] sm:h-[55px] xl:h-[100px] xl:w-[100px] rounded-full "
                  src={auth.currentUser.photoURL}
                  alt=""
                />
              </picture>
            )}
            <div className="relative w-full">
              <input
                type="file"
                // onChange={(e) => setResetpassemail(e.target.value)}
                className="w-full border-b border-solid border-white w-full py=6 sm:p-4 md:!py-6 sm:mt-4 md:mt-0 outline-0 font-nunito font-bold text-[18px]"
                placeholder="Email Adress"
                onChange={handleSelectdp}
              />

              <Cropper
                className="mx-auto"
                src={newdp}
                style={{ height: 300, maxWidth: 300 }}
                initialAspectRatio={1 / 1}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
            </div>

            <div className="w-10/12 flex justify-between">
              {dpuploader ? (
                <button
                  className="shadow-md shadow-black/30 w-5/12 text-center bg-white rounded-xl py-3 font-nunito font-bold text-xl text-primary mt-5 sm:mt-4 md:!mt-5"
                  onClick={getCropData}
                  disabled
                >
                  Uploading...
                  <span className="ml-3 align-middle">
                    <LoadingSpin
                      size="22px"
                      width="3px"
                      primaryColor="white"
                      secondaryColor="#5F35F5"
                      numberOfRotationsInAnimation="3"
                    />
                  </span>
                </button>
              ) : (
                <button
                  className="shadow-md shadow-black/30 w-5/12 text-center bg-white rounded-xl py-3 font-nunito font-bold text-xl text-primary mt-5 sm:mt-4 md:!mt-5"
                  onClick={getCropData}
                >
                  Upload
                </button>
              )}
              {dpuploader ? (
                <button
                  className="shadow-md shadow-black/30 w-5/12 text-center bg-white rounded-xl py-3 font-nunito font-bold text-xl text-primary mt-5 sm:mt-4 md:!mt-5"
                  onClick={handleClearprev}
                  disabled
                >
                  Clear
                </button>
              ) : (
                <button
                  className="shadow-md shadow-black/30 w-5/12 text-center bg-white rounded-xl py-3 font-nunito font-bold text-xl text-primary mt-5 sm:mt-4 md:!mt-5"
                  onClick={handleClearprev}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
