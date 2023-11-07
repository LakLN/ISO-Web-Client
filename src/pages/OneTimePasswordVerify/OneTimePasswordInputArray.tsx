import classNames from "classnames";
import { useEffect, useState } from "react";
import "./OneTimePasswordInputArray.scss";
import { Transition } from "@headlessui/react";

interface OneTimePasswordInputArrayProps {
  onFilled?: (otp: string) => void;
  onUnfilled?: () => void;
}

export default function OneTimePasswordInputArray({
  onFilled,
  onUnfilled,
}: OneTimePasswordInputArrayProps) {
  const [values, setValues] = useState<(number | null)[]>(
    new Array(6).fill(null),
  );
  const [visible, setVisible] = useState<boolean[]>(new Array(6).fill(true));

  const handleOnChange = (fieldIndex: number, fieldValue: any) => {
    let _fieldValue = !Number.isNaN(fieldValue)
      ? Number.parseInt(fieldValue as string)
      : null;

    let _replaceValues = [...values];
    _replaceValues[fieldIndex] = _fieldValue;
    setValues([..._replaceValues]);

    if (fieldValue === "") {
      _replaceValues[fieldIndex] = null;
    }
    if (fieldValue === null && fieldIndex > 0) {
      _replaceValues[fieldIndex - 1] = null;
    }

    setValues(_replaceValues);
    
    if (fieldValue !== null || fieldValue !== undefined) {
      setVisible([...visible].fill(true, fieldIndex + 1, fieldIndex + 2));

      // Focus to next element if is not a final one
      if (fieldIndex < 6) {
        setTimeout(() => {
          const nextFieldInput = document.getElementById(
            `otp-input-${fieldIndex + 1}`,
          );

          if (nextFieldInput != null) {
            nextFieldInput.focus({ preventScroll: true });
            (nextFieldInput as HTMLInputElement).select();
          }
        }, 2);
      } else if (fieldIndex === 6) {
        // Focus back to the last field (the same one) and blur to prevent further input
        setTimeout(() => {
          const lastFieldInput = document.getElementById(
            `otp-input-${fieldIndex}`
          );
            
          if (lastFieldInput != null) {
            lastFieldInput.focus({ preventScroll: true });
            lastFieldInput.blur();
          }
        }, 2);
      }
    }
  };

  const handleInvisibleCurrentChange = (e: any, fieldIndex: number) => {
    if (e.code === "Backspace" && fieldIndex >= 0) {
      let _replaceValues = [...values];
    _replaceValues[fieldIndex] = null;
    setValues([..._replaceValues]);
      setTimeout(() => {
        const previousFieldInput = document.getElementById(
          `otp-input-${fieldIndex - 1}`,
        );
  
        if (previousFieldInput != null) {
          previousFieldInput.focus({ preventScroll: true });
          (previousFieldInput as HTMLInputElement).select();
        }
      }, 0);
    }

    if (e.code === "ArrowLeft") {
      setTimeout(() => {
        const previousFieldInput = document.getElementById(
          `otp-input-${fieldIndex - 1}`,
        );

        if (previousFieldInput != null) {
          // nextFieldInput.style.background = "red";
          previousFieldInput.focus({ preventScroll: true });
          (previousFieldInput as HTMLInputElement).select();
        }
      }, 0);
    }

    if (e.code === "ArrowRight") {
      setTimeout(() => {
        const previousFieldInput = document.getElementById(
          `otp-input-${fieldIndex + 1}`,
        );

        if (previousFieldInput != null) {
          // nextFieldInput.style.background = "red";
          previousFieldInput.focus({ preventScroll: true });
          (previousFieldInput as HTMLInputElement).select();
        }
      }, 0);
    }
  };

  const isNumberKey = (evt: any) => {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
  };

  useEffect(() => {
    // console.log(values);
    if (values.every((value) => value !== undefined)) {
      onFilled && onFilled(values.join(""));
    } else {
      onUnfilled && onUnfilled();
    }
  }, [values]);

  return (
    <div className={classNames(`text-center gap-6 w-full`, ``)}>
      {[...new Array(6)].map((_v, passwordIdx) => {
        return (
          <Transition
            as={"input"}
            appear={true}
            show={visible[passwordIdx]}
            enter="transform-gpu ease-in-out duration-1000"
            enterFrom="transform-gpu translate-y-2 opacity-0"
            enterTo="transform-gpu translate-y-0 opacity-100"
            className={classNames(
              `ml-1 sm:ml-4 w-10 rounded-md text-xl md:text-3xl text-center inline-block`,
              `border bg-blue-500 text-blue-900 selection:text-black focus:border-black border-blue-600`,
              `delay-[calculate(${passwordIdx} * 75ms)]`,
              {
                hidden: !visible[passwordIdx],
              }
            )}
            
            onFocus={({ target }) => {
              target.select();
              if (passwordIdx === values.length) {
                target.blur();
              }
            }}
            
            onChange={({ target }) => {
              if (target.value.length > 1) {
                target.value = target.value.slice(0, 1);
              }
              handleOnChange(passwordIdx, target.value);
            }}
            key={`otp-input-${passwordIdx}`}
            id={`otp-input-${passwordIdx}`}
            onKeyDown={(e) => handleInvisibleCurrentChange(e, passwordIdx)}
            type="text"
            maxLength={1}
            value={values[passwordIdx]?.toString() || ''}
          >
          </Transition>
        );
      })}
    </div>
  );
}
