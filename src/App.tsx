import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

import Authenticate from "./pages/Authenticate/Authenticate";
import AuthenticateLogin from "./pages/Authenticate/AuthenticateLogin";
import AuthenticateSignUp from "./pages/Authenticate/AuthenticateSignUp";
import VerifyEmail from "./pages/EmailConfirmation/IncompleteConfirmEmail";
import UserAppLayout from "./components/Layout/UserAppLayout";
import AdminAppLayout from "./components/Layout/AdminAppLayout";
import RecruiterAppLayout from "./components/Layout/RecruiterAppLayout";
import InterviewerAppLayout from "./components/Layout/InterviewerAppLayout";

import Jobs from "./pages/Jobs/Jobs";
import Events from "./pages/Events/Events";
import EmailConfirmationLayout from "./pages/EmailConfirmation/EmailConfirmationLayout";
import IncompleteConfirmEmail from "./pages/EmailConfirmation/IncompleteConfirmEmail";
import CompleteConfirmEmail from "./pages/EmailConfirmation/CompleteConfirmEmail";

export default function App() {
  return (
    <BrowserRouter>
      {/* Route switcher */}

      <Routes>
        <Route path="/" element={<UserAppLayout />}>
          <Route path="auth" element={<Authenticate />}>
            <Route index path="login" element={<AuthenticateLogin />} />
            <Route index path="signup" element={<AuthenticateSignUp />} />
            <Route index element={<AuthenticateLogin />} />
          </Route>

          <Route path="/email" element={<EmailConfirmationLayout />}>
            <Route path="incomplete" element={<IncompleteConfirmEmail />} />
            <Route path="complete" element={<CompleteConfirmEmail />} />
          </Route>

          <Route index element={<Home />} />
          <Route index path="jobs" element={<Jobs />} />
          <Route index path="events" element={<Events />} />
        </Route>

        <Route path="/admin" element={<AdminAppLayout />}>
          {/* Define admin routes here */}
        </Route>

        <Route path="/recruiter" element={<RecruiterAppLayout />}>
          {/* Define recruiter routes here */}
        </Route>

        <Route path="/interviewer" element={<InterviewerAppLayout />}>
          {/* Define interviewer routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
