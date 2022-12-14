import React from "react";
import { v4 } from "uuid";
import ErrorLabel from "./ErrorLabel";

type props = {
  id: string;
  label?: string;
  placeholder: string;
  value?: string;
  register: any;
  errorMessage?: any;
};

const InputEmail = ({
  id,
  label,
  errorMessage,
  placeholder,
  value,
  register,
}: props) => {
  return (
    <>
      {label && (
        <label htmlFor="id" className={`text-gray-800 text-sm font-medium`}>
          {label}
        </label>
      )}
      <>
        <input
          {...register}
          key={id}
          id={id}
          type="email"
          className="rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
          placeholder={placeholder}
          defaultValue={value}
        />
        {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
      </>
    </>
  );
};

export default InputEmail;
