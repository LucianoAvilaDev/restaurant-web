import { ImSpinner8 } from "react-icons/im";

const Loader = () => {
  return (
    <div
      className={`fixed z-[99] bg-black/50 overscroll-contain w-full min-h-screen flex space-x-2 justify-center align-center items-center`}
    >
      <div
        className={`font-bold animate-showIn ease-in-out text-white inner-shadow`}
      >
        <ImSpinner8 size={40} className={`animate-spin`} />
      </div>
    </div>
  );
};

export default Loader;
