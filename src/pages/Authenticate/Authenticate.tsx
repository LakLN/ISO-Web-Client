import React, { useEffect } from "react";
import classnames from "classnames";
import image from "../../../images/sprite.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { toast } from "react-toastify";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";
import classNames from "classnames";

export default function Authenticate() {
  const navigate = useNavigate();

  const handleBrowseJobClick = () => {
    navigate(`/jobs`);
  };
  const { isLoggedIn, token, loading } = useAppSelector((app) => app.Auth);

  /**
   * If the user is logged in
   */
  const backgroundStyle = {
    backgroundImage: 'url("/images/background.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };
  useEffect(() => {
    if (isLoggedIn && token) {
      toast.info(
        `You are already signed in. If you want to switch to another account, please sign out first.`,
      );
    }
  }, [isLoggedIn, token]);

  if (loading === "pending") {
    return (
      <div
        className={classNames(
          `text-3xl text-zinc-300 min-h-[1vh] flex flex-row items-center justify-center`,
        )}
      >
        <div className={classNames(` `)}>
          <LoadSpinner />
        </div>
      </div>
    );
  }

  if (isLoggedIn && token) {
    return <div className="min-h-screen"></div>;
  }

  return (
    <div
      className={classnames(
        "flex flex-col md:flex-row gap-12 items-center justify-center",
        `min-h-[100vh] mb-16`,
      )}
      style={backgroundStyle}
    >
      <div className="w-full md:w-1/2 lg:w-5/12 xl:w-4/12 ">
        <Outlet />
      </div>
    </div>

  );
}
