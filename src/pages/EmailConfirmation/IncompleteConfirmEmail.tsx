import React from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const IncompleteConfirmEmail = () => {
  const navigate = useNavigate();

  const handleResendEmail = () => {
    toast.warning('Resend email logic not initialize.');
    // navigate('/email/complete');
  };
  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div
      className="px-10 py-8 rounded-[35px] w-full mt-8 mb-8 bg-blue-200 shadow-lg"
    >
      {/* Icons */}
      <div>
        <Transition appear={true} show={true}>
          <Transition.Child
            className="flex flex-col items-center transition-all duration-700 ease-in-out"
            enter="transform opacity-0 scale-50"
            enterFrom="transform opacity-0 scale-50"
            enterTo="transform opacity-100 scale-100"
          >
            <EnvelopeIcon className="w-1/2" style={{ color: '#333333' }} />
          </Transition.Child>
        </Transition>
      </div>

      <Transition
        appear={true}
        show={true}
        className="transition-all ease-in-out duration-700 delay-700"
        enter="transform opacity-0"
        enterFrom="transform opacity-0 translate-y-12"
        enterTo="transform opacity-100 translate-y-0"
      >
        <h1 className="text-black text-3xl font-bold leading-10 my-4 text-center">
          Đăng ký thành công.
        </h1>
      </Transition>

      <Transition
        appear={true}
        show={true}
        className="transition-all ease-in-out duration-700 delay-1000"
        enter="transform opacity-0"
        enterFrom="transform opacity-0 translate-y-12"
        enterTo="transform opacity-100 translate-y-0"
      >
        <h2 className="text-black leading-normal text-xl">
          Bạn cần phải xác thực, <br />
          Vui lòng kiểm tra email của bạn để tiếp tục.
        </h2>
      </Transition>

      <Transition
        show={true}
        appear={true}
        className="transition-all ease-in-out duration-700 delay-1000"
        enter="transform opacity-0"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        {/* <div className="mt-8 flex flex-row-reverse">
          <PrimaryButton text="Gửi lại" onClick={handleResendEmail} />
        </div> */}
        <div className='mt-8 flex flex-row-reverse'>
          <PrimaryButton text='Đến Trang chủ' onClick={handleReturnHome} />
        </div>
      </Transition>
    </div>
  );
};

export default IncompleteConfirmEmail;
