import "./index.css";
import { Routes, Route } from "react-router-dom";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Message from "./pages/message/Message";
import Notification from "./pages/notification/Notification";
import Settings from "./pages/settings/Settings";
import ResetPassword from "./pages/resetpassword/ResetPassword.js"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<Home />} />
      <Route path="/message" element={<Message />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
