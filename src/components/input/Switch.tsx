import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
<link
  rel="stylesheet"
  href="https://unpkg.com/@themesberg/flowbite@1.1.0/dist/flowbite.min.css"
/>;

type Props = {
  id: string;
  name: string;
  label: string;
  disabled?: boolean;
  defaultValue?: boolean;
  register?: any;
};

export const Switch = ({
  id,
  disabled,
  name,
  defaultValue,
  register,
  label,
}: Props) => {
  const [toggleValue, setToggleValue] = useState<boolean>(defaultValue ?? true);

  return (
    <>
      <div
        className="shadow-lg rounded-xl relative inline-block w-10 mr-2 align-middle select-none ease-in"
        onClick={async (e: any) => {
          if (!disabled) setToggleValue(!toggleValue);
        }}
      >
        {/* BOLINHA */}
        <input
          {...register}
          type="checkbox"
          key={v4()}
          id={id}
          name={name}
          disabled={disabled ?? false}
          checked={toggleValue}
          className={`${
            toggleValue
              ? !disabled
                ? "right-0 border-themeDark bg-white"
                : "right-0 border-themeDarker bg-gray-300"
              : !disabled
              ? "border-gray-300 bg-white"
              : "border-gray-400 bg-gray-300"
          } absolute transition-all block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer`}
        />
        {/* ATRÁS DA BOLINHA */}
        <label
          htmlFor="toggle"
          className={`${
            toggleValue
              ? !disabled
                ? "right-0 border-themeDark bg-themeDark"
                : "right-0 border-themeDarker bg-themeDarker"
              : !disabled
              ? "border-gray-300 bg-gray-300"
              : "border-gray-400 bg-gray-400"
          }  block transition-all overflow-hidden h-5 rounded-full cursor-pointer`}
        ></label>
      </div>
      <label htmlFor="toggle" className="text-sm text-gray-700">
        {label}
      </label>
    </>
  );
};
