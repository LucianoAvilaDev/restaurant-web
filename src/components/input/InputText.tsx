import React from "react";
import { v4 } from "uuid";

type props = {
  id?: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder: string;
  value: string;
  label: string;
  register: any;
};

const InputText = ({
  id,
  name,
  readOnly,
  label,
  required,
  placeholder,
  value,
  register,
}: props) => {
  return (
    <>
      {label && (
        <label htmlFor="id" className={`text-gray-800 text-sm font-normal`}>
          {label}
        </label>
      )}
      <input
        {...register}
        key={v4()}
        id={id}
        name={name}
        type="text"
        readOnly={readOnly ?? false}
        required={required ?? false}
        className="rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        defaultValue={value}
      />
    </>
  );
};

export default InputText;
