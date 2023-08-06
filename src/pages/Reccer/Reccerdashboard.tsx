import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { data } from "../../data/RecDashboardData";
import RecCard from "../../components/RecDashboardCard/RecDashboardCard";
import LineChart from "./Recchart";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchRecJobList } from "../../redux/reducer/RecJobSlice";
import {
  fetchRecInterviewerList,
  fetchRecInterviewerSkill,
} from "../../redux/reducer/RecInterviewerSilce";
import {
  fetchCandidateList,
  fetchCandidateSkill,
} from "../../redux/reducer/CandidateListSlice";
import axiosInstance from "../../utils/AxiosInstance";
import { current } from "@reduxjs/toolkit";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Reccer_dashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRecJobList());
    dispatch(fetchCandidateList());
    dispatch(fetchCandidateSkill());
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const dashboard: any = useAppSelector(
    (state) => state.RecDashboardList.recDashboardList,
  );
  const [showdata, setshowdata] = useState(dashboard);
  useEffect(() => {
    const fetchPosition = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance(`recruiter/statistic`);
        setshowdata(response.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosition();
  }, []);
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return (
    <>
      {!isLoading ? (
        <>
          <div className="mx-[3%] h-full">
            <Menu as="div" className="relative inline-block pt-4 text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Today
                  <ChevronDownIcon
                    className="w-5 h-5 -mr-1 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100 "
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 mt-2 origin-top-left bg-white rounded-md shadow-lg left-30 w-30 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm",
                          )}
                        >
                          Yesterday
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm",
                          )}
                        >
                          Week
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm",
                          )}
                        >
                          Month
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <div className="flex flex-wrap justify-start items-center mt-[20px] ">
              {/* <!-- Card --> */}
              {/* First Line */}
              {/* Active User */}
              {showdata &&
                showdata.length > 0 &&
                showdata.map((data: any) => (
                  <div className="px-3 mb-8 lg:w-1/4 md:w-1/2">
                    <button
                      className={`p-4 rounded-lg hover:bg-blue-200 w-full bg-[#E3F5FF]`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={classNames(
                            "flex flex-row items-center justify-between leading-7 tracking-wider w-full",
                          )}
                        >
                          <p>{data.title}</p>
                          <div className="flex">
                            <p className="inline-flex gap-2 my-2 text-sm ">
                              {data.value}
                            </p>
                            <span className="flex items-center justify-center">
                              <HiOutlineArrowTrendingUp />
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
            </div>
            <div className="mb-5 bg-white drop-shadow-md rounded-2xl">
              <p className="px-[5%] pt-[3%] font-semibold text-2xl">
                Today DashBoard
              </p>

              <div className="h-[400px]">
                <LineChart showdata={showdata} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center my-4 min-h-[70vh] flex-col items-center">
          <LoadSpinner className="text-3xl text-emerald-500" />
        </div>
      )}
    </>
  );
}
