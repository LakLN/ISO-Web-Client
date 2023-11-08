import React from "react";
import { Outlet } from "react-router-dom";

export default function EmailConfirmationLayout() {
  const backgroundStyle = {
    backgroundImage: `url('/images/Shiny_Overlay_background.svg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  return (
    <div
      className={"flex flex-col md:flex-row gap-12 items-center justify-center min-h-[80vh] mb-16"}  
      style={backgroundStyle}
    >
      <div className="w-full md:w-1/2 lg:w-5/12 xl:w-4/12">
        <Outlet />
      </div>
    </div>
  );
}
