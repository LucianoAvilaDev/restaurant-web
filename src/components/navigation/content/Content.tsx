import Breadcrumb from "../breadcrumb/Breadcrumb";

const Content = ({ children }: any) => {
  return (
    <div className={`bg-themeBgBody h-full w-full`}>
      <Breadcrumb />

      {children}
    </div>
  );
};

export default Content;
