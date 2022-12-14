import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();

  let navigate = useNavigate();
  let [fullname, setFullName] = useState("");
  let [fullnameerr, setFullNameErr] = useState("");
  let [email, setEmail] = useState("");
  let [emailerr, setEmailErr] = useState("");
  let [pass, setPass] = useState("");
  let [passerr, setPassErr] = useState("");
  let [passshow, setPassShow] = useState(false);
  let [firebaseerr, setFirebaseerr] = useState("");
  let [successreg, setSuccessreg] = useState("");
  let [spin, setSpin] = useState(false);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(pass);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
    setFirebaseerr("");
  };

  let handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameErr("");
  };
  let handlePass = (e) => {
    setPass(e.target.value);
    setPassErr("");
  };

  let handlePassShow = () => {
    setPassShow(!passshow);
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailErr("Give Email");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErr("Enter valid email");
    }

    if (!fullname) {
      setFullNameErr("Give Full Name");
    }

    if (!pass) {
      setPassErr("Give Password");
    } else if (!/^(?=.*[a-z])/.test(pass)) {
      setPassErr("Password must contain a lowercase");
    } else if (!/^(?=.*[A-Z])/.test(pass)) {
      setPassErr("Password must contain an uppercase");
    } else if (!/^(?=.*[0-9])/.test(pass)) {
      setPassErr("Password must contain a number");
    } else if (!/^(?=.*[!@#$%^&*])/.test(pass)) {
      setPassErr("Password must contain a symbol");
    } else if (!/^(?=.{8,})/.test(pass)) {
      setPassErr("Password must contain 8 or more character");
    }

    if (email && pass && emailRegex && passRegex) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((user) => {
          setSpin(true);
          updateProfile(auth.currentUser, {
            displayName: fullname,
            photoURL: "images/defaul-dp.webp",
          })
            .then(() => {
              console.log("REGISTRATION DONE");
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  console.log("CONFIRMATION EMAIL SEND");
                  console.log(user);
                  setSpin(false);
                  setSuccessreg(
                    "Registration Successful. Please verify your email"
                  );
                })
                .then(() => {
                  console.log(user.user.displayName);
                  set(ref(db, "users/" + user.user.uid), {
                    name: user.user.displayName,
                    email: user.user.email,
                    photoURL: user.user.photoURL,
                  }).then(() => {
                    setTimeout(() => {
                      navigate("/login");
                    }, 3000);
                  });
                });
            })
            .catch((error) => {
              console.log("DISPLAY NAME COULDN'T CHANGE");
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setFirebaseerr("Email already in use");
            setSuccessreg("");
          }
        });
    }
  };

  return (
    <div className="flex justify-center md:items-center ">
      <div className="sm:w-1/2 flex justify-center sm:flex-col items-end md:mr-[69px] sm:py-[3%] pt-[10%] md:pt-0 md:pb-[3%] px-2.5 lg:px-0">
        <div className="lg:w-[397px] xl:w-[497px] ">
          <h1 className="font-bold text-[28px] sm:text-[31px] md:text-[34.4px] text-center sm:text-left text-dPrimary font-nunito leading-9 lg:leading-[45px] mb-3">
            Get started with easily register
          </h1>
          <p className="font-nunito md:text-[20.64px] text-[18px] text-dPrimary/50 text-center sm:text-left">
            Free register and you can enjoy it
          </p>
          {firebaseerr && (
            <p className="font-nunito font-semibold text-[14px] text-red-500 mt-[.5%] mb-[-15px]">
              {firebaseerr}
            </p>
          )}
          {successreg && (
            <p className="font-nunito font-semibold text-[13px] text-[white] mt-[.5%] mb-[-15px] bg-green-500 p-1 z">
              {successreg}
            </p>
          )}
          <form action="" className="md:w-[368px] font-nunito ">
            <div className="relative">
              <label className="text-dPrimary/70  font-semibold text-[13.76px] absolute top-[26px] md:top-[26px] sm:top-[15px] left-[55px] bg-white px-[20px]  ml-[-23px]">
                Email Address
              </label>
              <input
                type="email"
                onChange={handleEmail}
                className="border-[1.72px] border-solid border-dPrimary/30 w-full md:w-full sm:w-[90%] rounded-lg py-[10px] sm:py-[15px] md:py-[20px] pl-[52px] pr-[10px] mt-9 md:mt-9 sm:mt-[1.5rem] text-dPrimary font-semibold text-[20.64px] "
              />
              {emailerr && (
                <p className="font-nunito font-semibold text-[13px] text-red-500 text-center mt-[.5%] mb-[-15px]">
                  {emailerr}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="text-dPrimary/70  font-semibold text-[13.76px] absolute top-[26px] md:top-[26px] left-[55px] sm:top-[15px] bg-white px-[20px]  ml-[-23px]">
                Full Name
              </label>
              <input
                type="text"
                onChange={handleFullName}
                className="border-[1.72px] border-solid border-dPrimary/30 w-full md:w-full sm:w-[90%] rounded-lg py-[10px] sm:py-[15px] md:py-[20px] pl-[52px] pr-[10px] mt-9 md:mt-9 sm:mt-[1.5rem] text-dPrimary font-semibold text-[20.64px] "
              />
              {fullnameerr && (
                <p className="font-nunito font-semibold text-[13px] text-red-500 text-center mt-[.5%] mb-[-15px]">
                  {fullnameerr}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="text-dPrimary/70  font-semibold text-[13.76px] absolute top-[26px] md:top-[26px] left-[55px] sm:top-[15px] bg-white px-[20px] ml-[-23px]">
                Password
              </label>
              <input
                type={passshow ? "text" : "password"}
                onChange={handlePass}
                className="border-[1.72px] border-solid border-dPrimary/30  w-full md:w-full sm:w-[90%] rounded-lg py-[10px] sm:py-[15px] md:py-[20px] pl-[52px] pr-[10px] mt-9 md:mt-9 sm:mt-[1.5rem] text-dPrimary font-semibold text-[20.64px] "
              />
              {passshow ? (
                <RiEyeFill
                  onClick={handlePassShow}
                  className={`${
                    passerr == ""
                      ? "absolute right-4 bottom-[20%] sm:bottom-[24%] sm:right-12 md:!bottom-[22%] md:!right-5"
                      : "absolute right-4 bottom-[33%] sm:bottom-[40%] sm:right-12 md:!bottom-[36%] md:!right-5"
                  }`}
                />
              ) : (
                <RiEyeCloseFill
                  onClick={handlePassShow}
                  className={`${
                    passerr == ""
                      ? "absolute right-4 bottom-[20%] sm:bottom-[24%] sm:right-12 md:!bottom-[22%] md:!right-5"
                      : "absolute right-4 bottom-[33%] sm:bottom-[40%] sm:right-12 md:!bottom-[36%] md:!right-5"
                  }`}
                />
              )}
              {passerr && (
                <p className="animate-pulse font-nunito font-semibold text-[13px] text-red-500 text-center mt-[.5%] mb-[-15px]">
                  {passerr}
                </p>
              )}
            </div>
            <div className=" justify-center flex sm:w-[90%] md:w-full">
              {spin ? (
                <button
                  disabled
                  onClick={handleSubmit}
                  className="font-nunito py-[14px] text-center w-[80%] sm:w-full bg-primary text-white rounded-[86px] font-semibold text-[20.64px] mt-[40px] md:mt-[40px] sm:mt-[25px] mb-[25px] cursor-not-allowed "
                >
                  Signing up
                  <span className="ml-3 align-middle">
                    <LoadingSpin
                      size="22px"
                      width="3px"
                      primaryColor="#FFF"
                      secondaryColor="#FFFFFF30"
                      numberOfRotationsInAnimation="3"
                    />
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="font-nunito py-[14px] text-center w-[80%] sm:w-full bg-primary text-white rounded-[86px] font-semibold text-[20.64px] mt-[40px] md:mt-[40px] sm:mt-[25px] mb-[25px] "
                >
                  Sign up
                </button>
              )}
            </div>
            <p className="sm:w-[90%] md:w-full font-open text-[13.34px] text-[#03014C] flex justify-center">
              Already have an account ?{" "}
              <Link to="/login" className="ml-[4px] font-bold text-[#EA6C00]">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden sm:block w-1/2 h-screen">
        <picture>
          <img
            className="h-screen w-full object-cover"
            loading="lazy"
            src="images/registration-bg.webp"
            alt=""
          />
        </picture>
      </div>
    </div>
  );
};

export default Registration;
