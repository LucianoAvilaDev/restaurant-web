import React from "react";
import { v4 } from "uuid";

type props = {
  id?: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder: string;
  value: string;
  onclick: Function;
};

const InputText = ({
  id,
  name,
  readOnly,
  required,
  placeholder,
  value,
}: props) => {
  return (
    <input
      id={id ?? v4()}
      name={name}
      type="text"
      required={required ?? false}
      readOnly={readOnly ?? false}
      className="rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-red-500 shadow-sm focus:shadow-red-500 focus:z-10 sm:text-sm"
      placeholder={placeholder}
    />
  );
};

export default InputText;
