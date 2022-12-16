import { useEffect, useState } from "react";
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
  top?: boolean;
  setValue?: any;
};

export const Switch = ({
  id,
  disabled,
  name,
  defaultValue,
  register,
  label,
  top,
  setValue,
}: Props) => {
  const [toggleValue, setToggleValue] = useState<boolean>();

  useEffect(() => {
    setToggleValue(defaultValue ?? false);
  }, [defaultValue]);

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center">
        {top && (
          <label
            htmlFor={id}
            className="text-sm font-medium  truncate py-1 cursor-pointer text-gray-700"
          >
            {label}
          </label>
        )}
        <div
          className="shadow-md  shadow-gray-300 hover:opacity-70 hover:shadow-gray-500 items-center rounded-xl relative inline-block w-10 mr-2 align-middle select-none"
          onClick={async (e: any) => {
            if (!disabled) {
              setValue(name, !toggleValue);
              setToggleValue(!toggleValue);
            }
          }}
        >
          {/* BOLINHA */}
          <input
            {...register}
            type="checkbox"
            key={v4()}
            id={id}
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
            } absolute transition-transform delay-100 block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer`}
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
            }  block transition-color overflow-hidden h-5 rounded-full cursor-pointer`}
          ></label>
        </div>
      </div>
      {!top && (
        <label htmlFor={id} className="text-sm cursor-pointer text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};
