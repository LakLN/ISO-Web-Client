import { useEffect, useState } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import Container from "../Container/Container";
import MobileNavbar from "./MobileNavbar";
import { useAppSelector } from "../../hooks/hooks";
import LoadSpinner from "../LoadSpinner/LoadSpinner";
import qs from "qs";
import { useTokenAuthorize } from "../../hooks/useTokenAuthorize";
import NavbarUserLoggedInCard from "./NavbarUserLoggedInCard";
import "./styles/Navbar.css";
import { ImageList } from "@mui/material";

export default function Navbar() {
  useTokenAuthorize();

  const { items } = useAppSelector((app) => app.Navbar);
  const { isLoggedIn, loading, user } = useAppSelector((app) => app.Auth);
  const { pathname } = useLocation();
  const [submenuOpen, setSubmenuOpen] = useState<number | null>(null);
  
  const [sticky, setSticky] = useState(false);

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  }, []);
  const { pathname: currentPathname } = useLocation();

  const [compiledQuerySearch, setCompiledQuerySearch] = useState(
    qs.stringify({}),
  );
  useEffect(() => {
    setCompiledQuerySearch(
      qs.stringify(
        currentPathname.includes(`/auth/login`) ||
          currentPathname.includes(`/logout`) ||
          currentPathname.includes(`/otp`) ||
          currentPathname.includes("/email")
          ? {}
          : { from: currentPathname },
      ),
    );
  }, [currentPathname]);

  return (
    <div className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${
      sticky
        ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
        : "relative !transition-transform transform translate-y-0"
      }`} >
      {/* Small width devices */}
      <MobileNavbar />
      <Container>
        {/* Desktop */}
        <div className="container pr-0 flex items-start justify-between">
          {/* Logo */}
          <div className="w-60 max-w-full px-4 xl:mr-6">
            {/* Icons */}
            <div className={classNames(`flex flex-row items-start gap-12 flex-1`)}>
              <Link to="/" className={`header-logo block w-full ${sticky ? "py-5 lg:py-5" : "py-5"}`}>
                <img
                  src="/images/logo/logo-light.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full dark:hidden"
                />
                <img
                  src="/images/logo/logo-dark.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-full dark:block"
                />
              </Link>
            </div>
          </div>

          {/* Menu Items */}
          <div className="menu-item-wrapper pl-0 flex-1 flex items-center justify-center">
            <ul
              className="hidden md:flex flex-wrap justify-center"
              style={{
                display: "flex", // Add this to make menu items display horizontally
                flexWrap: "wrap", // Add this to allow items to wrap to the next line
                justifyContent: "flex-start",
                paddingTop: "13px" // Adjust this based on your layout
              }}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setSubmenuOpen(index)}
                  onMouseLeave={() => setSubmenuOpen(null)}
                  className="menu-item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "auto",
                    padding: "20px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    position: "relative", // Add this for submenu positioning
                  }}
                >
                  <Link
                    to={item.url}
                    className={classNames(
                      `py-2`,
                      `text-zinc-600 hover:text-zinc-700`, // Change text color and hover color
                      `transition-colors ease-in-out`,
                      `font-semibold` // Add font weight here
                    )}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && item.subItems.length > 0 && submenuOpen === index && (
                  <ul
                    className="submenu"
                    style={{
                      position: "absolute", // Add this to make submenu absolute
                      top: "100%", // Add this to position submenu below the menu item
                      left: 0, // Add this to align submenu with menu item
                      display: "block", // Show submenu when open
                      zIndex: 999, // Set a high z-index to make submenu appear on top
                      backgroundColor: "white", // Background color of submenu
                      borderRadius: "5px", // Add this for rounded corners
                      padding: "10px 0", // Add vertical padding
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)", // Add box 0
                      minWidth: "200px", // Add a minimum width for submenu
                    }}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        style={{
                          padding: "5px 20px", // Add padding to submenu items
                        }}
                      >
                        <Link
                          to={subItem.url}
                          className={classNames(
                            `text-zinc-600 hover:text-zinc-700`, // Change text color
                            `font-semibold` // Add font weight here
                          )}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}  
                </div>
              ))}
              {user?.role === "ADMIN" && (
      <div
        key="dashboard"
        className="menu-item"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "auto",
          padding: "20px",
          paddingTop: "10px",
          paddingBottom: "10px",
          position: "relative",
        }}
      >
        <Link
          to="/admin/users"  // Adjust the URL as needed
          className={classNames(
            `py-2`,
            `text-zinc-600 hover:text-zinc-700`,
            `transition-colors ease-in-out`,
            `font-semibold`
          )}
        >
          Dashboard
        </Link>
      </div>
    )}
            </ul>
          </div>
          
          {/* Right Items */}
          <div className="flex items-start ml-auto"
              style={{paddingTop: "22px",}}>
            {loading === "pending" ? (
              <LoadSpinner className="text-zinc-400" />
            ) : loading === `success` ? (
              !isLoggedIn ? (
                <div className={classNames(`flex flex-row gap-4`)}>
                  <Link
                    to={`/auth/login?${compiledQuerySearch}`}
                    className={classNames(
                      `px-3 py-2`,
                      `bg-blue-600 text-white hover:bg-blue-700`,
                      `font-semibold`,
                      `rounded-xl`
                    )}>
                    Đăng nhập
                  </Link>
                </div>
              ) : (
                <NavbarUserLoggedInCard />
              )
            ) : (
              // Failed
              <div className={classNames(`flex flex-row gap-4`)}>
                <Link
                  to="/auth/login"
                  className={classNames(
                    `px-3 py-2`,
                    `bg-blue-600 text-white hover:bg-blue-700`,
                    `font-semibold`,
                    `rounded-xl`
                  )}>
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
