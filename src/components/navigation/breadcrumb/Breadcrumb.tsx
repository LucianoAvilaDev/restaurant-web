import { useContext, useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiChevronsRight } from "react-icons/bi";
import { v4 } from "uuid";
import { AuthContext } from "../../../contexts/AuthContext";
import { GetBreadcrumbMenus } from "../../../utils/GetBreadcrumbMenus";

const Breadcrumb = () => {
  const { ref } = useContext(AuthContext);

  const getItemByRef = (ref: string) => {
    return GetBreadcrumbMenus(ref);
  };

  const [breadcrumbList, setBreadcrumbList] = useState<
    { url: string; name: string }[]
  >([]);

  useEffect(() => {
    const paths: string[] = ref
      .replace(`${process.env.NEXT_PUBLIC_WEB_URL}/` ?? "", "")
      .split("/");

    const refList: { url: string; name: string }[] = paths.map(
      (item: string) => {
        return getItemByRef(item);
      }
    );
    setBreadcrumbList(refList);
  }, []);

  return (
    <div className="flex w-full">
      <div
        key={v4()}
        className={`flex w-full m-2 rounded-xl shadow-md bg-themeDarker py-2 px-3 space-x-2`}
      >
        <div className="flex items-baseline">
          <div
            key={v4()}
            className={`flex text-themeTextLight border-b  border-themeDarker text-xs items-center`}
          >
            <AiOutlineHome size={16} />
          </div>
          <div className={`flex pl-2 items-center text-themeTextLight`}>
            <BiChevronsRight size={14} />
          </div>
        </div>
        {breadcrumbList.map(
          (itemRef: { url: string; name: string }, index: number) => {
            return (
              <div key={v4()} className={`flex`}>
                <div
                  key={v4()}
                  className={`flex border-b border-themeDarker text-themeTextLight text-xs space-x-2 items-center`}
                >
                  <div>{itemRef.name}</div>
                </div>
                {index + 1 != breadcrumbList.length && (
                  <div
                    className={`flex pl-2  items-center text-themeTextLight`}
                  >
                    <BiChevronsRight size={14} />
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
