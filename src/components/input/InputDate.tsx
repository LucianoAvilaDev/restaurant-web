import ErrorLabel from "./ErrorLabel";

type Props = {
  register?: any;
  id: string;
  name?: string;
  label: string;
  setValue: Function;
  errorMessage?: string;
};

const InputDate = ({
  register,
  name,
  id,
  errorMessage,
  label,
  setValue,
}: Props) => {
  return (
    <div className="'flex pt-0.5 flex-col">
      {label && (
        <label
          htmlFor="id"
          className={`flex text-gray-800 text-sm font-medium`}
        >
          {label}
        </label>
      )}
      <input
        type="date"
        {...register}
        name={name}
        className="rounded-md relative block w-full px-2 py-[0.5rem] border focus:border-2 focus:border-blue-500 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none shadow-md focus:shadow-gray-500 focus:z-10 sm:text-sm"
        id={id}
        onChange={(e: any) => {
          setValue(name, e.target.value ?? "");
        }}
      />
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
};

export default InputDate;
