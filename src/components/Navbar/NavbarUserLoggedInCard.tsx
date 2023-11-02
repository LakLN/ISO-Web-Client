  import { Menu, Transition } from "@headlessui/react";
  import classNames from "classnames";
  import { Fragment, useEffect, useState } from "react";
  import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
  import { Link } from "react-router-dom";
  import { setNavbarMenu } from "./slices/NavbarSlice";

  import {
    HiArrowLeftOnRectangle,
    HiCog6Tooth,
    HiEnvelope,
    HiInformationCircle,
    HiQuestionMarkCircle,
    HiUserCircle,
  } from "react-icons/hi2";
  import {
    prepareCandidateProvider,
    prepareOtherProvider,
  } from "../../utils/NavigateMenu";

  export default function NavbarUserLoggedInCard() {
    const { menu } = useAppSelector((app) => app.Navbar);
    const { loading, user } = useAppSelector((app) => app.Auth);

    const dispatch = useAppDispatch();
    const [dropdownItemList, setDropdownItemList] = useState<any[]>([]);

    useEffect(() => {
      if (loading === "success" && user) {
        const supplierDropdownItem =
          user.role === "USER"
            ? prepareCandidateProvider()
            : prepareOtherProvider();
        setDropdownItemList(supplierDropdownItem);
      }
    }, [loading, user]);

    const handleOnExpandNavbarMenuDropdown = () => {
      dispatch(setNavbarMenu({ ...menu, visible: true }));
    };

    return (
      <div className="relative pr-0" style = {{marginTop: "-7px"}}>
        <div className="top-22px left-0 w-32">
        <Menu as="div" className={classNames("relative")}>
          <Menu.Button className={classNames("w-full relative")} style={{ top: "0", right: "0" }}>
            <div
              className={classNames("flex flex-row gap-4")}
              onClick={handleOnExpandNavbarMenuDropdown}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className={classNames(
                  `py-4`,
                  `transition-colors ease-in-out `,
                  `text-black-500`,
                  `hover:text-blue-700 font-bold`,
                )}
              >
                {user?.fullName}
              </span>
            </div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute left-0 z-10 mt-1 origin-top-right bg-white rounded-md shadow-lg w-48 ring-1 ring-gray-700 ring-opacity-5 focus:outline-none ">
              <div className="py-1 px-2">
                {dropdownItemList.map((item, _idx) => (
                  <Menu.Item key={`navigate-menu-item-navbar-${item.url}`}>
                    <Link
                      to={item.url}
                      key={item.url}
                      className={classNames(
                        `px-2 py-2 flex flex-row items-center gap-4 text-base group`,
                        `transition-colors ease-in-out duration-100 rounded-xl`,
                        `text-gray-600`,
                      )}
                    >
                      <span
                        className={classNames(
                          `group-hover:text-[#059669]`,
                          `transition-colors ease-in-out duration-100`,
                        )}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={classNames(
                          `group-hover:text-[#059669] font-semibold`,
                          `transition-colors ease-in-out duration-100`,
                        )}
                      >
                        {item.text}
                      </span>
                    </Link>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      </div>
    );
  }
