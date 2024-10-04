"use client";
import classNames from "classnames";

type SwitchProps = React.HTMLAttributes<HTMLDivElement> & {
  checked?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  radius?: boolean;
};

export default function Switch({
  children,
  checked = true,
  radius = true,
  onClick,
  ...props
}: SwitchProps) {
  // Classes for button and circle
  const buttonClasses = classNames(
    "rounded-full flex h-5 ring-1 ring-inset transition-all duration-200",
    checked ? "bg-blue-500 ring-transparent" : "bg-white ring-black",
    radius ? "w-5 ml-5" : "w-10"
  );

  const circleClasses = classNames(
    "rounded-full w-3 h-3 m-1 transition-all duration-200",
    checked ? "bg-white" : "bg-black"
  );

  return (
    <div
      className={`flex items-center w-min ${children === "KMS" ? "mb-5" : ""}`}
      {...props}
    >
      <label className="pr-2 w-28">{children}</label>
      <button
        onClick={onClick}
        className={buttonClasses}
        aria-pressed={checked} // Improved accessibility
      >
        <span className={circleClasses} />
      </button>
      <label className="pl-2">{checked ? "On" : "Off"}</label>
    </div>
  );
}
