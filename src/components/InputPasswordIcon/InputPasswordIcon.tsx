import React, { useState } from "react";
import classnames from "classnames";
import { FieldValues, UseFormRegister, Path } from "react-hook-form";

interface InputPasswordIconProps<T extends FieldValues> extends React.HTMLProps<HTMLInputElement> {
  register: UseFormRegister<T>;
  required?: boolean;
  icon: React.ReactElement;
  wrapperClassName?: string;
  className?: string;
  label: Path<T>;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

export default function InputPasswordIcon<T extends FieldValues>({
  wrapperClassName,
  icon,
  register,
  label,
  required,
  showPassword,
  togglePasswordVisibility,
  ...children
}: InputPasswordIconProps<T>) {

  return (
    <div className={classnames(`flex flex-row items-center justify-center`, `bg-white text-zinc-500`, `rounded-md`, `border w-full p-1`, wrapperClassName)}>
      <div className={classnames(`w-4 mx-2`)}>
        <span className="">{icon}</span>
      </div>

      <div className="flex-1 relative">
        <input
          className={classnames(`p-2`, `font-light`, `outline-none rounded-r-md`, `w-full`)}
          {...register(label, { required })}
          {...children}
          type={showPassword ? "text" : "password"}
        />
        <span
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="24"
              height="24"
              color="rgba(0, 0, 0, 0.54)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.988 11.92v.041c0 .013.004.026.01.037l-.002.02v.019l-.002.015v.012c-.003.004-.003.01-.003.013l-.002.009v.01c0 .007 0 .016-.003.022v.002a.813.813 0 01-.208.438 14.289 14.289 0 01-1.474 1.56c-1.045.984-2.197 1.855-3.433 2.528-.977.53-2.017.959-3.097 1.175l-.076.016h-.005l-.005.001-.006.001a8.683 8.683 0 01-1.586.161h-.2a8.724 8.724 0 01-1.597-.163h-.003a.916.916 0 00-.08-.016c-1.078-.216-2.117-.646-3.092-1.176-1.235-.67-2.386-1.543-3.43-2.527a14.04 14.04 0 01-1.476-1.558.821.821 0 01-.208-.437v-.002l-.001-.013-.002-.01v-.007l-.001-.011c-.003-.005-.003-.009-.003-.014C2 12.057 2 12.05 2 12.04a.214.214 0 010-.057l.003-.02v-.014l.002-.014v-.023l.002-.01c0-.007 0-.015.002-.022v-.002a.813.813 0 01.208-.438 13.98 13.98 0 011.596-1.672C4.823 8.83 5.935 8 7.125 7.352c.887-.48 1.831-.88 2.808-1.11l.054-.013c.025-.005.05-.01.075-.017l.021-.005.016-.003.016-.003A8.943 8.943 0 0111.896 6h.2a8.898 8.898 0 011.777.2l.018.004.018.003.086.02.058.015c.98.23 1.922.63 2.812 1.113 1.19.644 2.3 1.478 3.314 2.413.577.512 1.11 1.07 1.596 1.671a.812.812 0 01.209.439v.002l.001.011v.011l.003.008v.01zM12 16a4 4 0 100-8 4 4 0 000 8z"
                fill="currentColor"
              ></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width="24"
              height="24"
              color="rgba(0, 0, 0, 0.54)"
              className="WZT4Ok"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.562 7.391a.75.75 0 011.047.17c1.178 1.637 3.382 4.69 8.391 4.69 5.01 0 7.213-3.053 8.391-4.69a.75.75 0 011.218.877l-.004.006c-.47.652-1.141 1.584-2.117 2.486a.716.716 0 01.042.04l2 2a.75.75 0 01-1.06 1.06l-2-2a.747.747 0 01-.13-.173 10.15 10.15 0 01-2.955 1.425l.827 2.48a.75.75 0 01-1.423.475l-.876-2.628A12.65 12.65 0 0112 13.75c-.68 0-1.317-.05-1.912-.14l-.876 2.627a.75.75 0 11-1.423-.474l.827-2.481a10.153 10.153 0 01-2.956-1.425.75.75 0 01-.13.173l-2 2a.75.75 0 11-1.06-1.06l2-2a.756.756 0 01.042-.04c-.976-.902-1.647-1.834-2.117-2.486l-.004-.006a.75.75 0 01.17-1.047z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </span>
      </div>
    </div>
  );
}
