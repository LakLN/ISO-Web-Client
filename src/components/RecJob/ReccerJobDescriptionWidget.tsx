import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import classNames from "classnames";

interface JobDescriptionWidgetProps {
  companyName: any;
  jobRole: any;
  publishDate: any;

  logo: {
    src: any;
    alt: any;
  };
}

export default function ReccerJobDescriptionWidget({
  companyName,
  jobRole,
  publishDate,
  logo,
}: JobDescriptionWidgetProps) {
  return (
    <Transition as={Fragment} show={true}>
      <div
        className={classNames(
          `flex flex-row bg-white shadow-sm`,
          `rounded-xl p-2`,
          `gap-6 items-center`,
          `border`,
        )}
      >
        {/* Logo */}
        <div
          className={classNames(
            `w-2/12 flex flex-col items-center justify-center`,
          )}
        >
          <img
            className={classNames(`min-w-[64px] w-1/2`)}
            draggable={false}
            src={logo.src}
            alt={logo.alt}
          />
        </div>
        {/* Information */}
        <div className={classNames(`flex flex-row flex-1 `)}>
          <div
            className={classNames(`flex flex-col flex-1 font-semibold gap-1`)}
          >
            <span>{companyName}</span>
            <span>{jobRole}</span>
          </div>
          {/* Right */}

          {/* TODO: change this to from date to date */}
          <div className={`text-zinc-400 text-sm mr-10 `}>
            {publishDate}
          </div>
        </div>
      </div>
    </Transition>
  );
}
