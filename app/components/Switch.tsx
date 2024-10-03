"use client";

type SwitchProps = React.JSX.IntrinsicAttributes &
  React.ClassAttributes<HTMLDivElement> &
  React.HTMLAttributes<HTMLDivElement> & {
    checked?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
  };

export default function Switch({
  children,
  checked = true,
  ...props
}: SwitchProps) {
  const classes = {
    button: [
      ["bg-blue-500 ring-transparent flex-row-reverse", "bg-white  ring-black"][
        checked ? 0 : 1
      ],
      "rounded-full flex w-10 h-5 ring-1 ring-inset",
    ].join(" "),
    circle: [
      ["bg-white", "bg-black"][checked ? 0 : 1],
      "rounded-full w-3 h-3 m-1",
    ].join(" "),
  };
  return (
    <div className="flex items-center px-2 w-96 " {...props}>
      <label className="pr-2 w-28">{children}</label>
      <button className={classes.button}>
        <span className={classes.circle} />
      </button>
      <label className="pl-2">{checked ? "On" : "Off"}</label>
    </div>
  );
}
