import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  logout,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoadingSpin from "react-loading-spin";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  let [passshow, setPassShow] = useState(false);
  let [email, setEmail] = useState("");
  let [emailerr, setEmailErr] = useState("");
  let [pass, setPass] = useState("");
  let [passerr, setPassErr] = useState("");
  let [firebaseerr, setFirebaseerr] = useState("");
  let [spin, setSpin] = useState(false);
  let [showresetpass, setShowresetpass] = useState(false);
  let [resetpassemail, setResetpassemail] = useState("");

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
    email
  );
  const resetpassmailRegex =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(pass);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailErr("");
    setFirebaseerr("");
  };

  let handlePass = (e) => {
    setPass(e.target.value);
    setPassErr("");
    setFirebaseerr("");
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

    if (!pass) {
      setPassErr("Give Password");
    }
    // else if (!/^(?=.*[a-z])/.test(pass)) {
    //   setPassErr("Password must contain a lowercase");
    // } else if (!/^(?=.*[A-Z])/.test(pass)) {
    //   setPassErr("Password must conta  an uppercase");
    // } else if (!/^(?=.*[0-9])/.test(pass)) {
    //   setPassErr("Password must contain a number");
    // } else if (!/^(?=.*[!@#$%^&*])/.test(pass)) {
    //   setPassErr("Password must contain a symbol");
    // } else if (!/^(?=.{8,})/.test(pass)) {
    //   setPassErr("Password must contain 8 or more character");
    // }

    if (
      email &&
      pass
      // && emailRegex && passRegex
    ) {
      signInWithEmailAndPassword(auth, email, pass)
        .then((user) => {
          toast("Login Succcessful!");
          setSpin(true);
          setTimeout(() => {
            setSpin(false);
            navigate("/");
          }, 3000);
        })

        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/user-not-found")) {
            setFirebaseerr("User does not exist");
          }
          if (errorCode.includes("auth/wrong-password")) {
            setPassErr("Password incorrect...");
          }
          if (errorCode.includes("auth/too-many-requests")) {
            setFirebaseerr("Too many requests. please try again later.");
          }
        });
    }
  };

  let handleGooglelogin = () => {
    signInWithPopup(auth, provider).then(() => {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  };

  let handleResetpasslink = () => {
    sendPasswordResetEmail(auth, resetpassemail).then(() => {
      toast("Link has been sent to you email!!!");
      setTimeout(() => {
        setShowresetpass(false);
      }, 3000);
      // Password reset email sent!
    });
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message
    // });
  };

  return (
    <div className="flex justify-center md:items-center ">
      <ToastContainer position="bottom-center" theme="dark" autoClose={1500} />
      <div className="sm:w-1/2 flex justify-center sm:flex-col items-end lg:mr-[69px] md:ml-[1%] lg:ml-0 sm:py-[3%] pt-[10%] md:pt-0 md:pb-0 px-2.5 lg:px-0">
        <div className="lg:w-[397px] xl:w-[497px] items-center flex-col flex sm:block">
          <h1 className="font-bold text-[28px] sm:text-[31px] md:text-[34.4px] text-center sm:text-left text-dPrimary font-nunito leading-9 lg:leading-[45px] mb-3">
            Login to your account!
          </h1>
          <Link
            className="mb-10 font-open font-semibold text-[13.34px] py-[18px] md:py-[23px] px-[20px] md:px-[30px] border-[0.83px] border-vdPrimary/30 rounded-[8.34px] mt-2 md:mt-[28px] inline-block"
            to=""
            onClick={handleGooglelogin}
          >
            <picture>
              <img
                className="inline mt-[-2px] mr-[10px]"
                src="images/google.webp"
                alt=""
              />
            </picture>
            Login with google
          </Link>
          {firebaseerr && (
            <p className="font-nunito font-semibold text-[14px] text-[white] bg-[#FF0000] w-[75%] pl-2 mt-[-25px] mb-[15px]">
              {firebaseerr}
            </p>
          )}

          <form action="" className="md:w-[400px] font-nunito ">
            <div className="relative">
              <label className="text-dPrimary/70  font-semibold text-[13.76px] bg-white px-[20px] ml-[-20px]">
                Email Address
              </label>
              <input
                onChange={handleEmail}
                type="email"
                className="border-b-[1.72px] border-solid border-dPrimary/30 w-full  py-[10px] mb-[50px] pr-[10px] text-dPrimary font-semibold text-[20.64px] outline-0"
                placeholder="Youraddress@email.com"
              />
              {emailerr && (
                <p className="animate-pulse font-nunito font-semibold text-[13px] text-[#FFFFFF] bg-[#FF0000] text-center mt-[-10%] mb-[8%]">
                  {emailerr}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="text-dPrimary/70  font-semibold text-[13.76px] bg-white px-[20px] ml-[-20px]">
                Password
              </label>
              <input
                onChange={handlePass}
                type={passshow ? "text" : "password"}
                className="border-b-[1.72px] border-solid border-dPrimary/30 w-full  py-[10px] pr-[10px] text-dPrimary font-semibold text-[20.64px] outline-0"
                placeholder="Enter your password"
              />
              {passshow ? (
                <RiEyeFill
                  onClick={handlePassShow}
                  className="absolute right-3 top-[55%]"
                />
              ) : (
                <RiEyeCloseFill
                  onClick={handlePassShow}
                  className="absolute right-3 top-[55%]"
                />
              )}
              {passerr && (
                <p className="animate-pulse font-nunito font-semibold text-[13px] text-[#FFFFFF] bg-[#FF0000] text-center mt-[4%] mb-[-15px]">
                  {passerr}
                </p>
              )}
            </div>
            <div className="items-center flex flex-col">
              {spin ? (
                <button
                  disabled
                  onClick={handleSubmit}
                  className="font-nunito py-[18px] md:py-[23px] px-[35px] text-center sm:w-full bg-primary text-white rounded-[8.71px] font-semibold text-[18px] md:text-[20.64px] mt-[60px] mb-[35px] shadow-xl shadow-primary-500/80 cursor-not-allowed"
                >
                  Logining in
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
              ) : pass.length < 8 ? (
                <button
                  disabled
                  // onClick={handleSubmit}
                  title={"Enter credentials to login"}
                  className="font-nunito py-[18px] md:py-[23px] px-[35px] text-center sm:w-full bg-[#999] text-white rounded-[8.71px] font-semibold text-[18px] md:text-[20.64px] mt-[60px] mb-[35px] shadow-xl shadow-primary-500/80 cursor-not-allowed"
                >
                  Login to Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="font-nunito py-[18px] md:py-[23px] px-[35px] text-center sm:w-full bg-primary text-white rounded-[8.71px] font-semibold text-[18px] md:text-[20.64px] mt-[60px] mb-[35px] shadow-xl shadow-primary-500/80"
                >
                  Login to Continue
                </button>
              )}
            </div>

            <div className="text-center md:text-left md:flex justify-between ">
              <p className="md:text-[13.34px] block text-[#03014C] md:inline-block">
                Don't have an account ?{" "}
                <Link
                  to="/registration"
                  className="ml-[4px] font-bold text-[#EA6C00] "
                >
                  Sign up
                </Link>
              </p>
              or
              <p className="md:text-[13.34px] block md:inline-block align-right">
                <Link
                  onClick={() => setShowresetpass(!showresetpass)}
                  className="ml-[4px] font-bold text-primary "
                >
                  Reset password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden sm:block w-1/2 h-screen">
        <picture>
          <img
            className="h-screen w-full object-cover"
            loading="lazy"
            src="images/login-bg.webp"
            alt=""
          />
        </picture>
      </div>

      {/* PASSWORD RESET MODAL */}

      {showresetpass && (
        <div className="w-full h-screen bg-primary flex justify-center items-center fixed">
          <div className="shadow-xl shadow-white/20 p-9 bg-white  flex flex-col justify-around items-center relative">
            <p
              className="drop-shadow-xl drop-shadow-primary absolute top-0 right-0 h-8 w-8 text-center leading-8  font-nunito font-extrabold text-primary cursor-pointer text-2xl"
              onClick={() => setShowresetpass(false)}
            >
              X
            </p>
            <h1 className="drop-shadow-xl drop-shadow-primary text-5xl text-primary font-nunito font-bold">
              Reset Password
            </h1>
            <div className="relative w-full">
              <input
                type="email"
                onChange={(e) => setResetpassemail(e.target.value)}
                className="w-full border-b border-solid border-black w-full py=6 sm:p-4 mt-9  md:!py-6 sm:mt-4 md:!mt-9 outline-0 font-nunito font-bold text-[18px]"
                placeholder="Email Adress"
              />
            </div>
            <button
              className="shadow-md shadow-black/30 w-1/2 text-center bg-primary rounded-xl py-3 font-nunito font-semibold text-xl text-white mt-5 sm:mt-4 md:!mt-5"
              onClick={handleResetpasslink}
            >
              Send link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
