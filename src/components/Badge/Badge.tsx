import React from "react";
import classnames from "classnames";

interface BadgeProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={classnames(
        `px-1 py-1 rounded-md`,
        `flex flex-row items-center gap-2`,
        className,
      )}
    >
      {children}
    </div>
  );
}
