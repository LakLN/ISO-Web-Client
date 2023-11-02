import React, { useState, Fragment, useEffect } from "react";
import home_page from "../../../images/home_page.png";
import classnames from "classnames";
import {
  CakeIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

import { Link, createSearchParams, useNavigate } from "react-router-dom";
import JobCard from "../../components/JobCard/JobCard";
import BlogCard from "../../components/BlogCard/BlogCard";
import Advertise from "../../components/Advertise/Advertise";
import { Menu, Transition } from "@headlessui/react";
import { useAppSelector } from "../../hooks/hooks";
import {
  EventInterface,
  JobInterface,
  JobListConfig,
} from "../../services/services";
import useQueryParams from "../../hooks/useQueryParams";
import { omitBy, isUndefined } from "lodash";
import { JOB_POSITION } from "../../utils/Localization";

export type QueryConfig = {
  [key in keyof JobListConfig]: string;
};

export default function Home() {
  const jobs: JobInterface[] = useAppSelector((state) => state.Job.jobs);
  const events: EventInterface[] = useAppSelector((state) => state.Home.events);
  const listType = useAppSelector((state) => state.Job.type);
  const [type, setType] = useState("");
  const [showType, setShowType] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const queryParams: QueryConfig = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      index: queryParams.index || "1",
      size: queryParams.size || 10,
      name: queryParams.name,
      posName: queryParams.posName,
    },
    isUndefined,
  );

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      navigate({
        pathname: "/jobs",
        search: createSearchParams({
          ...queryConfig,
          name: search, // Tên biến lưu từ khóa tìm kiếm trên trang Home
          type: type, //
          index: "1",
        }).toString(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <div className={classnames("h-full")}>
      {/* Background */}
      <section
          id="home"
          className="relative z-[-1] h-screen overflow-hidden pt-[120px] pb-16 md:pt-[150px] md:pb-[120px] xl:pt-[180px] xl:pb-[160px] 2xl:pt-[210px] 2xl:pb-[200px]"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        > 
          <div className="absolute top-0 right-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div  className="relative opacity-30 lg:opacity-100 transform translate-y-20"
          style={{
            left: 0,
            right: 0,
            bottom: 40,
            zIndex: -1, // Đặt z-index thấp hơn để nó nằm dưới các phần tử khác
          }}>
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0" />
                <stop offset="1" stopColor="white" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </section>
      {/* Hero */}
      <div className="container"  style={{ paddingTop: '75px', paddingBottom: '100px' }}>
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[800px] text-center"
              data-wow-delay=".2s"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <h1
                className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight"
                style={{ flex: "1" }}
              >
                CHƯƠNG TRÌNH ISO 17024 <br/>TRƯỜNG TRUNG CẤP NGUYỄN TẤT THÀNH
              </h1>
            </div>
          </div>
        </div>
     </div>
      {/* SEARCH  */}
      <form
        className={classnames(
          "flex flex-col border rounded-md shadow-md md:shadow-lg md:flex-row p-3 gap-4 mt-[40px] md:mt-[80px]",
        )}
        onSubmit={(e) => handleSubmit(e)}
      >
        <div
          className={classnames(
            "flex w-full items-center flex-shrink-0 md:w-[49%] border-r-2",
          )}
        >
          <MagnifyingGlassIcon
            className={classnames(`w-[20px] ml-1 md:ml-4`)}
          />
          <input
            type="text"
            placeholder="Search your Keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={classnames(
              "w-[85%] h-full text-[10px] md:text-[17px] ml-3 focus:outline-none",
            )}
          />
        </div>

        <div
          className={classnames(
            "flex items-center w-full gap-4 md:w-[27%] border-r-2",
          )}
        >
          <CakeIcon className={classnames(`w-[20px] md:ml-4`)} />
          <Menu as="div" className={classnames("relative w-full")}>
            <Menu.Button className={classnames("w-full")}>
              <div
                className={classnames(
                  "text-[13px] cursor-pointer flex items-center justify-between",
                )}
                onClick={() => setShowType(!showType)}
              >
                {JOB_POSITION[type] || "TYPE OF JOB"}
                {showType && (
                  <ChevronUpIcon className={classnames("w-[20px] mr-4")} />
                )}
                {!showType && (
                  <ChevronDownIcon className={classnames("w-[20px] mr-4")} />
                )}
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute md:left-[-18px] w-full z-10 md:w-55 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {listType &&
                    listType.map((type, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <p
                            className={classnames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm cursor-pointer",
                            )}
                            onClick={() => {
                              setType(type);
                              setShowType(false);
                            }}
                          >
                            {JOB_POSITION[type]}
                          </p>
                        )}
                      </Menu.Item>
                    ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div
          className={classnames(
            "w-full md:w-[24%] flex items-center justify-center",
          )}
        >
          <button className="w-[50%] md:w-[80%] md:h-[56px] border rounded-md bg-emerald-700 shadow-md text-white">
            Search
          </button>
        </div>
      </form>

      {/* Popular Jobs  */}
      <div className="mt-[40px] md:mt-[80px]">
        <div className={classnames("text-center")}>
          <h3
            className={classnames(
              "text-black text-2xl md:text-3xl font-semibold tracking-wider capitalize",
            )}
          >
            Popular Jobs
          </h3>
          <p
            className={classnames(
              "text-gray-500 text-sm md:text-base font-medium text-center",
              `mt-2 mb-6 mx-6`,
            )}
          >
            Search all the open positions on the web. Get your own personalized
            salary estimate. Read reviews on over 30000+ companies worldwide.
          </p>
        </div>

        <div className="flex flex-wrap -mx-4 mt-[5px]">
          {/* <!-- Card --> */}
          {jobs &&
            jobs.slice(0, 6).map((job) => (
              <div
                key={job.jobId}
                className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/3"
              >
                <JobCard job={job} />
              </div>
            ))}
        </div>

        <div className={classnames("flex items-center justify-center")}>
          <Link
            to="/jobs"
            className={classnames(
              "bg-emerald-700 text-white p-3 rounded-md flex",
            )}
          >
            See more jobs
          </Link>
        </div>
      </div>

      {/* Lastest Blog Or News */}
      <div className="mt-[80px]">
        <div className={classnames("text-center")}>
          <h3
            className={classnames(
              "text-black text-xl md:text-2xl font-medium leading-7 tracking-wider capitalize",
            )}
          >
            Lastest Blog or News
          </h3>
          <p
            className={classnames(
              "text-gray-400 text-center text-sm md:text-lg font-medium capitalize",
            )}
          >
            Search all the open positions on the web. Get your own personalized
            salary estimate. Read reviews on over 30000+ companies worldwide.
          </p>
        </div>

        <div className="flex flex-wrap -mx-4 mt-[50px]">
          {/* <!-- Card --> */}
          {events &&
            events.slice(0, 6).map((event, index) => (
              <div
                key={event.id}
                className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/3"
              >
                <BlogCard event={event} />
              </div>
            ))}
        </div>

        <div className={classnames("flex items-center justify-center")}>
          <Link
            to="/events"
            className={classnames(
              "bg-emerald-700 text-white p-3 rounded-md flex",
            )}
          >
            See More News
          </Link>
        </div>
      </div>

      {/* Explore jobs now  */}
      <Advertise />
    </div>
  );
}
