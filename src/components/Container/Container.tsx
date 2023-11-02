import classNames from "classnames";

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {}

export default function Container({ children }: ContainerProps) {
  return (
    <div
      className={classNames(
        `container mx-auto max-w-full px-2 md:px-16`,
      )}
    >
      <div className="">{children}</div>
    </div>
  );
}
