import React from "react";
import { v4 } from "uuid";

type props = {
  id: string;
  name: string;
  label?: string;
  required?: boolean;
  placeholder: string;
  value?: string;
};

const InputPassword = ({
  id,
  name,
  label,
  required,
  placeholder,
  value,
}: props) => {
  return (
    <>
      {label && (
        <label htmlFor="id" className={`text-gray-800 text-sm font-normal`}>
          {label}
        </label>
      )}
      <input
        key={v4()}
        id={id}
        name={name}
        type="password"
        required={required ?? false}
        className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-red-500 shadow-sm focus:shadow-red-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        defaultValue={value}
      />
    </>
  );
};

export default InputPassword;
