import {
  AcademicCapIcon,
  BriefcaseIcon,
  ClockIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Select from "react-select";
import { useState } from "react";
import AddJobWidget from "../../../components/RecJob/AddJobWidget";
import Logo from "../../../../images/logo_FPT.png";
import AddJobCard from "../../../components/RecJob/AddJobCard";
import TextareaAutosize from "react-textarea-autosize";

export default function Addjob() {
  const skills = [
    { value: 1, label: "Programming" },
    { value: 2, label: "Data Analysis" },
    { value: 3, label: "Project Management" },
    { value: 4, label: "Communication" },
    { value: 5, label: "Problem Solving" },
  ];

  const [jobInformation, setJobInformation] = useState([
    { icon: <UserIcon />, name: "Employee Type", value: "" },
    { icon: <MapPinIcon />, name: "Location", value: "" },
    {
      icon: <ComputerDesktopIcon />,
      name: "Job Type",
      value: "",
    },
    { icon: <BriefcaseIcon />, name: "Experience", value: "" },
    { icon: <AcademicCapIcon />, name: "Qualification", value: "" },
    {
      icon: <CurrencyDollarIcon />,
      name: "Salary",
      value: "",
    },
    {
      icon: <ClockIcon />,
      name: "Posted at",
      value: "",
    },
  ]);

  return (
    <div className={classNames(`job-detail`, `flex flex-col gap-6`)}>
      <div className={classNames(`flex flex-col md:flex-row gap-12`)}>
        {/* Left side description */}
        <div className={classNames(`w-full md:w-8/12`, `flex flex-col gap-6`)}>
          {/* Widgets */}
          <AddJobWidget
          // companyName="FPT Software"
          // jobRole="Web Designer"
          // publishDate={new Date()}
          // logo={{ src: Logo, alt: "image" }}
          />
          {/* Details */}
          <div
            className={classNames(
              `border bg-white shadow-sm rounded-xl`,
              `px-8 py-8`,
              `text-justify`,
            )}
          >
            <div>
              <h1 className="text-2xl font-semibold">Job description</h1>
              <TextareaAutosize
                id="description"
                minRows={4}
                className="resize-none p-2.5 w-full text-justify bg-white border"
                placeholder="Job description here..."
              />
            </div>
          </div>

          {/* Responsibility */}
          <div
            className={classNames(
              `border bg-white shadow-sm rounded-xl`,
              `px-8 py-8`,
              `text-justify`,
            )}
          >
            <div>
              <h1 className="text-2xl font-semibold">
                Responsibility and Duties
              </h1>
              <TextareaAutosize
                id="responsibility"
                minRows={4}
                className="resize-none p-2.5 w-full text-justify bg-white border"
                placeholder="Responsibility here..."
              />
            </div>
          </div>

          {/* Skill */}
          <div
            className={classNames(
              `border bg-white shadow-sm rounded-xl`,
              `px-8 py-8`,
              `text-justify`,
            )}
          >
            <div>
              <h1 className="text-2xl font-semibold">Skills Require</h1>
              <Select options={skills} isMulti />
            </div>
          </div>
          {/* /Skill */}

          <div className={classNames(`px-8 py-8`, `text-justify`)}>
            <button
              className="rounded-lg bg-[#059669] hover:bg-green-900 px-4 py-2 mx-2 my-1 text-white"
              // onClick={routeChange}
            >
              Add Job
            </button>
          </div>
        </div>
        {/* Right side description */}
        <div className={classNames(`w-full md:w-3/12 flex-1 relative`)}>
          <AddJobCard
            cardData={jobInformation}
            setCardData={setJobInformation}
          />
        </div>
      </div>

      {/* /Applied Candidate */}
      {/* <Applied /> */}

      {/* Suggested Candidate*/}
      {/* <Suggested /> */}
    </div>
  );
}