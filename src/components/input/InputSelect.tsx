import React from "react";
import { v4 } from "uuid";
import ErrorLabel from "./ErrorLabel";

type props = {
  id: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder: string;
  label: string;
  register?: any;
  value?: any;
  options: { label: string; value: string }[];
  errorMessage?: any;
};

const InputSelect = ({
  id,
  name,
  readOnly,
  label,
  required,
  placeholder,
  register,
  options,
  errorMessage,
  value,
}: props) => {
  return (
    <>
      {label && (
        <label htmlFor="id" className={`text-gray-800 text-sm font-medium`}>
          {label}
        </label>
      )}
      <select
        {...register}
        id={id}
        className="cursor-pointer rounded-md relative block w-full px-2 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
        required={required ?? false}
        placeholder={placeholder}
      >
        <option key={0} value="">
          Selecione uma opção...
        </option>
        {options.map((option: { label: string; value: string }) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </>
  );
};

export default InputSelect;
