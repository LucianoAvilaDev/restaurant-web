import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiChevronsRight } from "react-icons/bi";
import { v4 } from "uuid";
import { BreadcrumbMenus, BreadcrumbMenuType } from "./BreadcrumbMenus";

const Breadcrumb = () => {
  const getItemByRef = (ref: string) => {
    return BreadcrumbMenus.filter((i: BreadcrumbMenuType) =>
      i.ref.includes(ref)
    )[0];
  };

  const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbMenuType[]>(
    []
  );

  useEffect(() => {
    if (document) {
      const paths: string[] = [
        ...document.location.href
          .replace(`${process.env.NEXT_PUBLIC_WEB_URL}/` ?? "", "")
          .split("/"),
      ];

      const refList: BreadcrumbMenuType[] = paths.map((item: string) => {
        return getItemByRef(item);
      });
      setBreadcrumbList(refList);
    }
  }, []);

  return (
    <>
      <div
        key={v4()}
        className={`flex m-2 rounded-xl shadow-md bg-themeDarker pt-2 pb-1 px-3 space-x-2`}
      >
        <a key={v4()} href={"dashboard"}>
          <div
            key={v4()}
            className={`flex text-themeTextLight border-b hover:border-themeTextLight border-themeDarker pb-1 text-xs items-center`}
          >
            <AiOutlineHome size={14} />
          </div>
        </a>
        <div className={`flex items-center text-themeTextLight`}>
          <BiChevronsRight size={14} />
        </div>
        {breadcrumbList.map((itemRef: BreadcrumbMenuType, index: number) => {
          return (
            <div key={v4()} className={`hover:border-b`}>
              {itemRef.url != "dashboard" && (
                <a key={v4()} href={itemRef.url}>
                  <div
                    key={v4()}
                    className={`flex text-themeTextLight text-xs space-x-2 items-center`}
                  >
                    <div>{itemRef.name}</div>
                  </div>
                </a>
              )}
              {index + 1 != breadcrumbList.length && (
                <div className={`flex items-center text-themeTextLight`}>
                  <BiChevronsRight size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Breadcrumb;
