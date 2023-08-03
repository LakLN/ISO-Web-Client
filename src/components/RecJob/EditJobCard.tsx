import React, { useState, useEffect, Fragment } from "react";
import classNames from "classnames";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { Menu, Transition } from "@headlessui/react";
import { JobDataInterface } from "../../data/jobData";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector } from "../../hooks/hooks";
import { TextareaAutosize } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { JOB_POSITION } from "../../utils/Localization";
import { useParams } from "react-router-dom";
import { JobInterface } from "../../services/services";
import axiosInstance from "../../utils/AxiosInstance";
import moment from "moment";

export default function EditJobCard({
  cardData,
  setCardData,
  setpositionId,
  setLocation,
  setjobType,
  salary,
  setSalary,
  deadline,
  setDeadline,
}: any) {
  const location = useAppSelector((state) => state.Job?.location);
  const employeeType = useAppSelector((state) => state.Job?.postion);
  const jobType = useAppSelector((state) => state.Job?.type);

  const listData = cardData.map((data: any) => data.value);

  const { jobId } = useParams();
  const [job, setJob] = useState<JobInterface | null>(null);
  useEffect(() => {
    const getJobDetail = async () => {
      const response = await axiosInstance.get(`recruiter/jobs/${jobId}`); //Viết API cho BE viết lấy 1 job trong list job của reccer
      setJob(response.data.result);
    };
    getJobDetail();
  }, [jobId]);



  setpositionId(listData[0]);
  setLocation(listData[1]);
  setjobType(listData[2]);
  const handleDateChange = (date: any) => {
    setDeadline(date);
  };
  const formattedLocation = location.map((item, index) => ({
    id: index + 1,
    value: item,
  }));


  const formattedEmployeeType = employeeType.map((item, index) => ({
    id: index + 1,
    value: item,
  }));


  const formattedJobType = jobType.map((item, index) => ({
    id: index + 1,
    value: item,
  }));

  const currentDate = new Date()
  const JobData: JobDataInterface = {
    listJobInfoSearch: {
      "Employee Type": formattedEmployeeType,
      Location: formattedLocation,
      "Job Type": formattedJobType,
    },
  };

  return (
    <div
      className={classNames(
        `w-full bg-white shadow-sm px-4 py-6 rounded-xl border sticky top-24`,
        `flex flex-col gap-4 mt-5`,
      )}
    >
      <h1 className={classNames(`font-semibold text-xl`)}>Job Information</h1>
      <div className={classNames(`flex flex-col gap-2`)}>
        {cardData != undefined &&
          cardData.map((item: { icon: any; name: string; value: string }) => {
            return (
              <div>
                <JobInformationCardItem icon={item.icon} name={item.name} />
                <div>
                  <Menu as="div" className={classNames("relative ml-14")}>
                    <Menu.Button
                      className={classNames(
                        "cursor-pointer flex items-center justify-between w-[60%] px-1 border rounded-full bg-gray-100",
                      )}
                    >
                      <span className={classNames("ml-2 text-gray-500")}>
                        {item.value}
                      </span>
                      <ChevronDownIcon
                        className={classNames("w-[20px] ml-4")}
                      />
                      {/* Drop down  */}
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
                      <Menu.Items className="absolute left-0 z-10 w-2/5 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {JobData &&
                            JobData.listJobInfoSearch &&
                            JobData.listJobInfoSearch[item.name] &&
                            JobData.listJobInfoSearch[item.name].map(
                              (e, _idx) => (
                                <Menu.Item key={_idx}>
                                  {({ active }) => (
                                    <p
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm",
                                      )}
                                      onClick={() => {
                                        let willChangeData = [...cardData];
                                        let idx = cardData.findIndex(
                                          (_item: any) =>
                                            _item.name === item.name,
                                        );
                                        willChangeData[idx].value = (
                                          e as any
                                        ).value;
                                        setCardData([...willChangeData]);
                                      }}
                                    >
                                      {(e as any).value}
                                    </p>
                                  )}
                                </Menu.Item>
                              ),
                            )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            );
          })}
      </div>
      <div className={classNames(`flex flex-row items-center gap-4`)}>
        <div className={classNames(`w-1/12 mx-2`)}>
          <CurrencyDollarIcon />
        </div>
        <div className={classNames(`flex flex-col flex-1`)}>
          <div>Salary</div>
          <TextareaAutosize
            id="description"
            minRows={4}
            value={salary}
            style={{
              lineHeight: "normal",
              outline: "none",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
              height: "26px",
              width: "160px",
              overflow: "hidden",
              resize: "none",
              padding: "2px",
            }}
            className="focus:outline-none focus:ring-black focus:ring-1"
            placeholder=""
            onChange={(event) => setSalary(event.target.value)}
          />
        </div>
      </div>
      <div className={classNames(`flex flex-row items-center gap-4`)}>
        <div className={classNames(`w-1/12 mx-2`)}>
          <ClockIcon />
        </div>
        <div className={classNames(`flex flex-col flex-1`)}>
          <div>End At</div>
          <DatePicker
            id="day"
            selected={deadline}
            value={moment(job?.deadline).format("Do MMMM, YYYY")}
            minDate={currentDate}
            onChange={handleDateChange}
            readOnly
            placeholderText="Select a day"
            className="border w-[160px] p-[1px] focus:outline-none focus:ring-black focus:ring-1 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

interface JobInformationCardItemProps {
  icon: React.ReactElement;
  name: string;
}

function JobInformationCardItem({ icon, name }: JobInformationCardItemProps) {
  return (
    <div className={classNames(`flex flex-row items-center gap-4`)}>
      <div className={classNames(`w-1/12 mx-2`)}>{icon}</div>
      <div className={classNames(`flex flex-col flex-1`)}>
        <span>{name}</span>
      </div>
    </div>
  );
}
