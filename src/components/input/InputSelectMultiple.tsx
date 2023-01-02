import Select from "react-select";
import { SelectType } from "../../types/SelectType";
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
  setValue: any;
  onChange?: Function;
};

const InputSelectMultiple = ({
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
  setValue,
  onChange,
}: props) => {
  return (
    <>
      {label && (
        <label htmlFor="id" className={`text-gray-800 text-sm font-medium`}>
          {label}
        </label>
      )}
      <Select
        {...register}
        id={id}
        className="flex z-10 truncate cursor-pointer shadow-md focus:shadow-gray-500 sm:text-sm"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "pointer",
            borderRadius: "0.375rem",
            width: "100%",
          }),
          container: (baseStyles, state) => ({
            ...baseStyles,
            cursor: "pointer",

            boxShadow: state.isFocused
              ? "0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)"
              : "",
            borderRadius: "0.375rem",
          }),
        }}
        required={required ?? false}
        placeholder={placeholder}
        options={options}
        isMulti
        value={value}
        onChange={(e: any) => {
          if (e) {
            const values: string = e.map((item: SelectType) => {
              return item.value;
            });
            if (onChange) onChange(e);
            setValue(name, values);
            return;
          }
          setValue(name, []);
          if (onChange) onChange([]);
        }}
        isClearable
      />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </>
  );
};

export default InputSelectMultiple;
