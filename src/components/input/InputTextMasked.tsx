import React from "react";
import { v4 } from "uuid";
import ErrorLabel from "./ErrorLabel";
import InputMask from "react-input-mask";

type props = {
  id: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder: string;
  value?: string;
  label: string;
  register?: any;
  errorMessage?: any;
  mask: string;
};

const InputTextMasked = ({
  id,
  name,
  readOnly,
  label,
  required,
  placeholder,
  register,
  value,
  errorMessage,
  mask,
}: props) => {
  return (
    <>
      {label && (
        <label htmlFor="id" className={`text-gray-800 text-sm font-medium`}>
          {label}
        </label>
      )}
      <InputMask
        mask={mask}
        maskChar="_"
        formatChars={{
          "0": "[0-9]",
          a: "[a-z]",
          A: "[A-Z]",
          "*": "[A-Za-z0-9]",
        }}
        {...register}
        key={id}
        id={id}
        type="text"
        readOnly={readOnly ?? false}
        required={required ?? false}
        className="rounded-md focus:font-mono relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
      />

      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </>
  );
};

export default InputTextMasked;
