import React, { Fragment, useEffect, useState } from "react";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import {
  EnvelopeIcon,
  LockClosedIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import InputIcon from "../../components/InputIcon/InputIcon";
import InputPasswordIcon from "../../components/InputPasswordIcon/InputPasswordIcon";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { authRegister } from "../../redux/AuthSlice";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";

function TermAndConditionsDialog({ visible, onClose, onOkay }: any) {
  return (
    <Transition appear show={visible} as={Fragment}>
    </Transition>
  );
}

export default function AuthenticateSignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const { registerLoadingState } = useAppSelector((app) => app.Auth);

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    dispatch(authRegister(data))
      .unwrap()
      .then(() => {
        navigate("/email/incomplete");
      })
      .catch((data) => {
        toast.error(data.message);
      });
  };

  const [visibleTermAndCondition, setVisibleTermAndCondition] =
    useState<boolean>(false);

  const handleCloseDialog = () => {
    setVisibleTermAndCondition(false);
  };

  const handleOpenTermOfServceDialog = () => {
    setVisibleTermAndCondition(true);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };

  return (
    <form
      className={classnames(
      `py-8 gap-4 items-center justify-center flex flex-col h-[70vh]`,
      `bg-blue-100 shadow-md`,
      `rounded-xl px-4 md:px-5 lg:px-6`,
      ` mx-auto`,
      "font-sans"
    )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mx-6 items-center flex flex-col gap-4 w-full">
        <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl mb-4">
          Đăng ký tài khoản
        </h3>

        <InputIcon
          icon={<UserIcon />}
          placeholder="Họ tên"
          register={register}
          label="fullName"
          required
          wrapperClassName={classnames({
            "border-red-300": errors && errors.fullName,
          })}
        />

        <InputIcon
          icon={<EnvelopeIcon />}
          placeholder="Email"
          register={register}
          label="email"
          type="email"
          autoComplete="username email"
          required
          wrapperClassName={classnames({
            "border-red-300": errors && errors.email,
          })}
        />

        <InputPasswordIcon
          icon={<LockClosedIcon />}
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
          register={register}
          label="password"
          autoComplete="new-password"
          required
          wrapperClassName={classnames({
            "border-red-300": errors && errors.password,
          })}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        

        <InputPasswordIcon
          icon={<LockClosedIcon />}
          placeholder="Nhắc lại mật khẩu"
          type={showPassword ? "text" : "password"}
          register={register}
          label="confirmPassword"
          autoComplete="new-password"
          required
          wrapperClassName={classnames({
            "border-red-300": errors && errors.confirmPassword,
          })}
          showPassword={showPassword}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <PrimaryButton
          type={"submit"}
          text="Đăng ký"
          style={{marginTop: "10px"}}
          disabled={registerLoadingState === "pending"}
          isLoading={registerLoadingState === "pending"}
        />
      </div>
      <TermAndConditionsDialog
        visible={visibleTermAndCondition}
        onClose={handleCloseDialog}
        onOkay={handleCloseDialog}
      />
      <p className="text-center text-base font-medium text-body-color">
        Đã có tài khoản?{" "}
        <Link to="/auth/login" className="text-blue-500 hover:underline ">
          Đăng nhập
        </Link>
      </p>
</form>
  );
}
