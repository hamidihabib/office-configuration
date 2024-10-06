type SwitchProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean;
  radio?: boolean;
};

export default function Switch({ checked, radio, ...props }: SwitchProps) {
  return (
    <button
      className={`rounded-full h-5 flex ring-1 ring-inset ${
        radio
          ? `w-5 ${checked ? "ring-blue-500" : "ring-gray-500"}`
          : `w-10 ${checked ? "bg-blue-500" : "ring-gray-500 flex-row-reverse"}`
      }`}
      {...props}
    >
      <span
        className={`rounded-full w-3 h-3 m-1 ${
          radio
            ? `${checked && "bg-blue-500"}`
            : `${checked ? "bg-white" : "bg-gray-500"}`
        }`}
      />
    </button>
  );
}
