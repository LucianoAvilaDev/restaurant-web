import ErrorLabel from "./ErrorLabel";

type props = {
  id: string;
  name: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder: string;
  value?: number;
  label: string;
  register?: any;
  min: number;
  max: number;
  step: number;
  errorMessage?: any;
  onChange?: Function;
};

const InputNumber = ({
  id,
  name,
  readOnly,
  label,
  required,
  placeholder,
  register,
  min,
  max,
  step,
  value,
  onChange,
  errorMessage,
}: props) => {
  return (
    <>
      {label && (
        <label htmlFor="id" className={`text-gray-800 text-sm font-medium`}>
          {label}
        </label>
      )}
      <input
        {...register}
        key={id}
        id={id}
        type="number"
        readOnly={readOnly ?? false}
        className="rounded-md relative block w-full px-2 py-[0.5rem] border focus:border-2 focus:border-blue-500 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        onChange={async (e) => {
          if (onChange) await onChange(e);
        }}
      />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </>
  );
};

export default InputNumber;
