import Breadcrumb from "../breadcrumb/Breadcrumb";

const Content = ({ children }: any) => {
  return (
    <div className={`bg-themeBgBody h-full w-full`}>
      <Breadcrumb />

      <div className={`h-`}>{children}</div>
    </div>
  );
};

export default Content;
