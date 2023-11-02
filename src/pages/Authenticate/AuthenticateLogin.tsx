  import React, {useState} from "react";
  import classnames from "classnames";
  import { useForm } from "react-hook-form";
  import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
  import InputIcon from "../../components/InputIcon/InputIcon";
  import InputPasswordIcon from "../../components/InputPasswordIcon/InputPasswordIcon";

  import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
  import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
  import { authLogin } from "../../redux/AuthSlice";
  import { UserLoginParamsInterface } from "../../services/services";
  import { toast } from "react-toastify";
  import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
  } from "react-router-dom";
  import LoadSpinner from "../../components/LoadSpinner/LoadSpinner";

  export default function AuthenticateLogin() {
    const { register, handleSubmit } = useForm<UserLoginParamsInterface>();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const from = searchParams.get("from");
    const navigate = useNavigate();
    const { loading, signInLoadingState } = useAppSelector((app) => app.Auth);

    const onSubmit = async (data: UserLoginParamsInterface) => {
      try {
        await dispatch(authLogin(data))
          .unwrap()
          .then(() => {
            toast.success(`Đăng nhập thành công!`);
            console.log(`Navigate from `, from, navigate === null ? `/` : from);
            navigate(from === null ? "/" : from.toString());
          });
      } catch (err: any) {
        toast.error(`Đăng nhập thất bại: ${err.message}`);
        throw err;
      }
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword); 
    };
    return loading === "pending" ? (
      <LoadSpinner />
    ) : (
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
        <div className="flex flex-col items-center w-full gap-4 mx-6">
          <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl mb-">
            Đăng nhập
          </h3>

          <InputIcon
            icon={<EnvelopeIcon />}
            type="text"
            placeholder="Nhập email"
            register={register}
            label={`email`}
          />

          <InputPasswordIcon
            icon={<LockClosedIcon />}
            type="password"
            placeholder="Nhập mật khẩu"
            register={register}
            label={`password`}
            autoComplete="current-password"
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          <div className="w-full flex flex-row-reverse items-center gap-4">
            <div className="ml-auto">
              <a
                href="/forget-password"
                className={classnames(
                  "text-sm font-medium text-primary hover:underline"
                )}
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>

          <PrimaryButton
            text="Đăng nhập"
            isLoading={signInLoadingState === "pending"}
            disabled={signInLoadingState === "pending"}
          />

          <div style={{ width: "50%", height: "1px", backgroundColor: "#000", margin: "14px 0" }} />
          
          <button 
            className={classnames(
              "mb-0 flex w-full items-center justify-center rounded-md p-3 text-base font-medium text-body-color shadow-one",
              "bg-white transition-colors hover:bg-gray-100 dark:bg-[#242B51] dark:text-body-color dark:hover:text-white",
              "hover:shadow-lg",
            )}>
            <span className="mr-3">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_95:967)">
                  <path
                    d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                    fill="#4285F4"
                  />
                  <path
                    d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                    fill="#34A853"
                  />
                  <path
                    d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                    fill="#EB4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_95:967">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            Đăng nhập bằng tài khoản Google
          </button>
          
          <p className="text-center text-base font-medium text-body-color">
            Bạn chưa có tài khoản? &nbsp; 
            <Link to="/auth/signup" className="text-blue-500 hover:underline ">
              Đăng ký
            </Link>
          </p>
        </div>
      </form>
    );
  }