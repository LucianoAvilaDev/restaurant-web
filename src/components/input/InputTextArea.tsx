import React from "react";
import { v4 } from "uuid";
import ErrorLabel from "./ErrorLabel";

type props = {
  id: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder: string;
  value?: string;
  label: string;
  register?: any;
  errorMessage: any;
};

const InputTextArea = ({
  id,
  name,
  readOnly,
  label,
  required,
  placeholder,
  register,
  errorMessage,
}: props) => {
  return (
    <>
      {label && (
        <label htmlFor="id" className={`text-gray-800 text-sm font-medium`}>
          {label}
        </label>
      )}
      <textarea
        {...register}
        rows={2}
        key={id}
        id={id}
        readOnly={readOnly ?? false}
        required={required ?? false}
        className="rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
      />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </>
  );
};

export default InputTextArea;