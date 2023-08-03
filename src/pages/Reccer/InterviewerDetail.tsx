import { avatar } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react'
import { GrDocumentText } from "react-icons/gr";
import blog_image from "../../../images/blog_image.png";
import { RecInterviewerInterface } from '../../services/services';
import axiosInstance from '../../utils/AxiosInstance';
import { useParams } from 'react-router-dom';
import { MdOutlineEmail, MdOutlineCalendarMonth, MdOutlineLocationOn } from "react-icons/md";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import LoadSpinner from '../../components/LoadSpinner/LoadSpinner';
import InterviewerRecent from '../../pages/Interviewer/InterviewRecent/InterviewRecent'
import RecInterviewerIn4Card from '../../components/RecInterviewerManageCard/RecInterviewerIn4Card';
import moment from 'moment';
import InterviewRecent from '../../pages/Interviewer/InterviewRecent/InterviewRecent';
import RecInterviewrecent from './RecInterviewRecent';
import RecInterviewRecent from './RecInterviewRecent';
import classNames from 'classnames';

export default function InterviewerDetail() {
  const { interviewerId } = useParams();
  const [interviewer, setInterviewer] = useState<RecInterviewerInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getInterviewerDetail = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`recruiter/interviewers/${interviewerId}`);
        setInterviewer(response.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getInterviewerDetail();
  }, [interviewerId]);
  // console.log(interviewer?.skills[0].name)
  const [InterviewerInformation, setInterviewerInformation] = useState([
    { icon: <MdOutlineEmail />, name: "", value: "" },
    { icon: <MdOutlineCalendarMonth />, name: "", value: "" },
    { icon: <MdOutlineLocationOn />, name: "", value: "" },
    { icon: <HiOutlineDeviceMobile />, name: "", value: "" },

  ]);

  useEffect(() => {
    if (interviewer) {
      setInterviewerInformation([
        { icon: <MdOutlineEmail />, name: "Email", value: interviewer?.email },
        { icon: <MdOutlineCalendarMonth />, name: "D.O.B", value: moment(interviewer?.dateOfBirth).format("Do MMM, YYYY") },
        {
          icon: <MdOutlineLocationOn />, name: "Address", value: interviewer?.address,
        },
        {
          icon: <HiOutlineDeviceMobile />, name: "Phone", value: formatPhoneNumber(interviewer?.phone),
        },
      ]);
    }
  }, [interviewer]);

  function formatPhoneNumber(phoneNumber: string) {
    // Remove any non-digit characters from the phone number using regex
    if (phoneNumber == null) { return }
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Check if the cleaned phone number has 10 digits (i.e., "0373412489")
    if (cleanedPhoneNumber.length === 10) {
      // Format the phone number as "0373-412-489"
      return cleanedPhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }

    // If the phone number doesn't have 10 digits, return the original value
    return phoneNumber;
  }
  return (
    <div>
      {interviewer ? (
        <>
          <section className='relative'>
            <div className='shrink-0 w-full'>
              <img src="../../../images/cover.jpg" className='h-64 w-full object-cover lg:rounded-b-md shadow ' />
            </div>
            <div className='md:flex ms-4 -mt-12'>
              <div className='md:w-full'>
                <div className='relative flex items-end'>
                  <img src={interviewer?.avatar || blog_image} className='h-28 w-28 rounded-full ring-4 ring-slate-50 ' />
                  <div className='ms-4'>
                    <p className='text-lg font-semibold'>{interviewer?.fullName}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className='relative mt-12 md:pb-15 pb-10'>
            <div className='grid md:grid-cols-12 grid-cols-1 gap-[30px]'>
              <div className='lg:col-span-8 md:col-span-7'>
                <div
                  className={classNames(
                    `border bg-white shadow-sm rounded-xl`,
                    `px-8 py-8`,
                    `text-justify`,
                  )}
                >
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Description
                    </h1>
                    <p>
                      {interviewer?.about}
                    </p>
                  </div>
                </div>
                <div
                  className={classNames(
                    `border bg-white shadow-sm rounded-xl`,
                    `px-8 py-8`,
                    `text-justify`, `mt-5`
                  )}
                >
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Skill
                    </h1>
                    <p>
                      <div>
                        {
                          interviewer?.skills?.map((skill, index) => (
                            <p
                              key={index}
                              className="px-4 py-2 gap-2 mt-2 ml-2 inline-flex bg-emerald-600 hover:bg-emerald-700 border-emerald-600  text-white rounded-md"
                            >
                              {skill.name}
                            </p>
                          ))}
                      </div>
                    </p>
                  </div>
                </div>
                <div
                  className={classNames(
                    `border bg-white shadow-sm rounded-xl`,
                    `px-8 py-8`,
                    `text-justify`, `mt-5`
                  )}
                >
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Education
                    </h1>
                    <p>
                      {
                        interviewer?.educations?.map((education, index) => (
                          <>
                            <p
                              key={index}
                              className="text-zinc-600 mt-3 text-lg "
                            >
                              {education.educationId}. {education.schoolName} - {education.specialized} - {education?.certificate}
                            </p>
                          </>
                        ))}
                    </p>
                  </div>
                </div>

                <div
                  className={classNames(
                    `border bg-white shadow-sm rounded-xl`,
                    `px-8 py-8`,
                    `text-justify`, `mt-5`
                  )}
                >
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Course
                    </h1>
                    <p>
                      {
                        interviewer?.courses?.map((course, index) => (
                          <>
                            <p
                              key={index}
                              className="text-zinc-600 mt-3 text-lg "
                            >
                              {course.courseId}. {course.courseName} - {course.trainningOrganizations} - {moment(course?.completionTime).format("Do MMM, YYYY")}
                            </p>
                          </>
                        ))}
                    </p>
                  </div>
                </div>
                <div
                  className={classNames(
                    `border bg-white shadow-sm rounded-xl`,
                    `px-8 py-8`,
                    `text-justify`, `mt-5`
                  )}
                >
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Project
                    </h1>
                    <p>
                      {
                        interviewer?.projects?.map((project, index) => (
                          <>
                            <p
                              key={index}
                              className="text-zinc-600 mt-3 text-lg "
                            >
                              {project.projectId}. {project.projectName} - {project.positionInProject}
                            </p>
                            <p
                              key={index}
                              className="text-zinc-600 mt-3 text-lg ml-4"
                            >
                              {project.description}
                            </p>
                          </>
                        ))}
                    </p>
                  </div>
                </div>

                <div
                  className={classNames(
                    `border bg-white shadow-sm rounded-xl`,
                    `px-8 py-8`,
                    `text-justify`, `mt-5`
                  )}
                >
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Experience
                    </h1>
                    <p>
                      {
                        interviewer?.experiences?.map((experience, index) => (
                          <>
                            <p
                              key={index}
                              className="text-zinc-600 mt-3 text-lg "
                            >
                              {experience.experienceId}. {experience.companyName} - {experience.position} - {experience.time}
                            </p>
                          </>
                        ))}
                    </p>
                  </div>
                </div>

                <div
                  className={classNames(
                    `border bg-white shadow-sm rounded-xl`,
                    `px-8 py-8`,
                    `text-justify`, `mt-5`
                  )}
                >
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Award
                    </h1>
                    <p>
                      {
                        interviewer?.awards?.map((award, index) => (
                          <>
                            <p
                              key={index}
                              className="text-zinc-600 mt-3 text-lg "
                            >
                              {award.awardId}. {award.awardName} - {award.awardOrganization} - {moment(award?.awardWinningTime).format("Do MMM, YYYY")}
                            </p>
                          </>
                        ))}
                    </p>
                  </div>
                </div>

                <div
                  className={classNames(
                    `border bg-white shadow-sm rounded-xl`,
                    `px-8 py-8`,
                    `text-justify`, `mt-5`
                  )}
                >
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Certificate
                    </h1>
                    <p>
                      {
                        interviewer?.certificates?.map((certificate, index) => (
                          <>
                            <p
                              key={index}
                              className="text-zinc-600 mt-3 text-lg "
                            >
                              {certificate.certificateId}. {certificate.certificateName} - {certificate.certificateBody} - {moment(certificate?.certificationTime).format("Do MMM, YYYY")}
                            </p>
                          </>
                        ))}
                    </p>
                  </div>
                </div>

              </div>

              <div className='lg:col-span-4 md:col-span-5 sticky top-20 '>
                <RecInterviewerIn4Card cardData={InterviewerInformation} />
              </div>
            </div>

          </section>
          <div><RecInterviewRecent /></div>
        </>
      ) : (
        <div className='grid items-center justify-center pt-5'>
          <LoadSpinner className='text-4xl ' />
        </div>
      )
      }
    </div>
  );
}
