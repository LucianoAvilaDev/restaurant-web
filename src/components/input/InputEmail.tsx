import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { v4 } from "uuid";

type props = {
  id: string;
  name: string;
  label?: string;
  required?: boolean;
  placeholder: string;
  value?: string;
  register: any;
};

const InputEmail = ({
  id,
  name,
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
        type="email"
        required={required ?? false}
        className="rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        defaultValue={value}
      />
    </>
  );
};

export default InputEmail;
