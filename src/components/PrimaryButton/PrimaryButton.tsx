import classnames from "classnames";
import { AiOutlineLoading } from "react-icons/ai";
export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function PrimaryButton({
  text,
  className,
  size,
  isLoading,
  ...children
}: PrimaryButtonProps) {
  return (
    <button
      className={classnames(
        `Button bg-blue-600 hover:bg-blue-800 disabled:bg-blue-900 text-white`,
        `transition-colors ease-in-out duration-100`,
        `rounded-lg flex-row justify-center items-center inline-flex gap-4`,
        "text-base p-3 w-full",
        {
          "text-sm px-4 py-2": size === "sm",
        },
        "font-bold",
        className,
      )}
      {...children}
    >
      {isLoading && <AiOutlineLoading className={`animate-spin`} />}
      {text}
    </button>
  );
}
