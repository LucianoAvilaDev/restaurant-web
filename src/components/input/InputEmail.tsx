import ErrorLabel from "./ErrorLabel";

type props = {
  id: string;
  label?: string;
  placeholder: string;
  value?: string;
  register: any;
  readOnly?: boolean;
  errorMessage?: any;
};

const InputEmail = ({
  id,
  label,
  errorMessage,
  placeholder,
  value,
  register,
  readOnly,
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
          className="rounded-md relative block w-full px-2 py-[0.5rem] border focus:border-2 focus:border-blue-500 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
          placeholder={placeholder}
          defaultValue={value}
          readOnly={readOnly}
        />
        {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
      </>
    </>
  );
};

export default InputEmail;
