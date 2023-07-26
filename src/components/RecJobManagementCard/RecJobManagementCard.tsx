import React from "react";
import classnames from "classnames";
import logo_FPT from "../../../images/logo_FPT.png";
import { Link } from "react-router-dom";
import moment from "moment"


export default function RecDashboardCard({ job }: any) {
   const now = moment();
   const created = moment(job.createdAt);
   const duration = moment.duration(now.diff(created));
   const days = duration.asDays();
   return (
      <>
         <div className="relative overflow-hidden transition-all duration-500 bg-white border rounded-md shadow group hover:shadow-lg h-fit">
            <div className="p-6">
               <div className="flex items-center">
                  <div className="w-14 h-14 min-w-[56px] flex items-center justify-center bg-white shadow  rounded-md">
                     <img className="w-12 my-3 h-110" src={logo_FPT} />
                  </div>

                  <div
                     className={classnames(
                        "ml-4 items-center leading-7 tracking-wider",
                     )}
                  >
                     <h1 className={classnames("text-black text-lg font-semibold ")}>
                        {job.name}
                        <span className="ml-5 text-sm font-semibold text-gray-400 ">
                           {days} days ago
                        </span>
                     </h1>
                     <button
                        className={classnames(
                           "text-[#05966A] text-center text-xs font-semibold bg-[#C6DED5] p-1 rounded-full px-2 hover:bg-[#05966A] hover:text-white",
                        )}
                     >
                        {job.jobType}
                     </button>
                     <span className="ml-3 text-sm font-semibold text-gray-400 ">
                        Hourly: {job.salaryRange}
                     </span>
                  </div>
               </div>
               <div className={classnames("flex items-start mt-4")}>
                  <h3
                     className={classnames(
                        "text-black text-center text-sm font-semibold leading-7 tracking-wider capitalize",
                     )}
                  >
                     Decription:
                     <span className="ml-1 font-normal text-gray-400">
                        {job.description}
                     </span>
                  </h3>
               </div>
               {
                  job.skills.map((items: any) => (
                     <span
                        className={classnames(
                           "bg-gray-300 hover:bg-gray-400  inline-block text-slate-900 text-xs px-2.5 py-0.5 font-semibold rounded-full me-1",
                        )}
                     >
                        {items.name}
                     </span>

                  ))
               }
               <div>
               </div>
            </div>
            <div className="items-center justify-between px-6 py-3 bg-gray-200 lg:flex">
               <div className="flex justify-between lg:inline-block"></div>
               <ul className="flex flex-wrap items-center mt-3 text-sm font-semibold text-gray-500 sm:mt-0">
                  <li>
                     <Link
                        to="../addjob/"
                        className="w-full px-5 py-2 mt-4 text-white btn btn-sm rounded-2xl bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 md:ms-2 lg:w-auto lg:mt-0 "
                     >
                        Edit
                     </Link>
                  </li>
                  <li>
                     <Link
                        to="../interview-schedule/"
                        className="w-full px-2 py-2 mt-4 text-white rounded-2xl bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 md:ms-2 lg:w-auto lg:mt-0"
                     >
                        Create Schedule
                     </Link>
                  </li>
               </ul>
            </div>
            <a className="absolute top-0 m-3 rounded-full btn btn-icon bg-emerald-600/5 hover:bg-emerald-600 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white end-0"></a>
         </div>
      </>
   );
}
