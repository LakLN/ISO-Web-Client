import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

import Authenticate from "./pages/Authenticate/Authenticate";
import AuthenticateLogin from "./pages/Authenticate/AuthenticateLogin";
import AuthenticateSignUp from "./pages/Authenticate/AuthenticateSignUp";
// <<<<<<< src/App.tsx
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import UserAppLayout from "./components/Layout/UserAppLayout";
import AdminAppLayout from "./components/Layout/AdminAppLayout";
import RecruiterAppLayout from "./components/Layout/RecruiterAppLayout";
import InterviewerAppLayout from "./components/Layout/InterviewerAppLayout";
// =======
import ReccerDashboard from "./pages/Reccer/Reccer_dashboard";

export default function App() {
  const activeMenu = false;
  return (
// <<<<<<< src/App.tsx
    <BrowserRouter>
      {/* Route switcher */}

      <Routes>
        <Route path="/" element={<UserAppLayout />}>
          <Route path="auth" element={<Authenticate />}>
            <Route index path="login" element={<AuthenticateLogin />} />
            <Route index path="signup" element={<AuthenticateSignUp />} />
            <Route index element={<AuthenticateLogin />} />
          </Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>

          <Route index element={<Home />} />
        </Route>

        <Route path="/admin" element={<AdminAppLayout />}>
          {/* Define admin routes here */}
        </Route>

        <Route path="/recruiter" element={<RecruiterAppLayout />}>
          {/* Define recruiter routes here */}
          <Route index element={<ReccerDashboard />} />
        </Route>

        <Route path="/interviewer" element={<InterviewerAppLayout />}>
          {/* Define interviewer routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
// =======
//     <div>
//       <BrowserRouter>
//         <div className="">
//           {activeMenu ? (
//             <div className="">
//               <Sidebar_Rec/>
//             </div>
//           ) : (
//             <div className="">
//               <Sidebar_Rec/>
//             </div>
//           )}
//           <div
//             className={
//               activeMenu
//                 ? 'min-h-screen md:ml-72 w-full  '
//                 : 'w-full min-h-screen flex-2 '
//             }
//           >
//             <div className="fixed md:static navbar w-full ">
//               {/* <Nav_Rec/> */}
//             </div>
//           </div>
//           <div>
//             <Routes>
//               <Route path="/default" element="Default"/>
//               <Route path="/calender" element="Calender"/>
//               <Route path="/interviewer" element="Interviewer"/>
//               <Route path="/candidate" element="Candidate"/>
//               <Route path="/job" element="Jobs"/>
//               <Route path="/event" element="Event"/>

//             </Routes>
//           </div>
//           <div className="fixed md:static w-1/3 ">
//             {/* RightSideBar */}
//           </div>


//         </div>
//       </BrowserRouter>
//     </div>
// >>>>>>> src/App.tsx
  );
}
