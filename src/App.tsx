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
import CandidateProfile from "./pages/Reccer/CandidateProfile";

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
          <Route path="Dashboard" index element={<ReccerDashboard />} />
          <Route path="cndinfo" index element={<CandidateProfile />} />
        </Route>

        <Route path="/interviewer" element={<InterviewerAppLayout />}>
          {/* Define interviewer routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
