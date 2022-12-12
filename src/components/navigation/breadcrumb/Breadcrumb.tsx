import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiChevronsRight } from "react-icons/bi";
import { v4 } from "uuid";
import { BreadcrumbMenus, BreadcrumbMenuType } from "./BreadcrumbMenus";

const Breadcrumb = () => {
  const router = useRouter();
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
    <div className="flex w-full">
      <div
        key={v4()}
        className={`flex w-full m-2 rounded-xl shadow-md bg-themeDarker py-1 px-3 space-x-2`}
      >
        <div className="flex items-center">
          <div
            className={`cursor-pointer`}
            onClick={() => {
              window.location.href =
                process.env.NEXT_PUBLIC_WEB_URL + "/dashboard";
            }}
          >
            <div
              key={v4()}
              className={`flex text-themeTextLight border-b hover:border-themeTextLight border-themeDarker text-xs items-center`}
            >
              <AiOutlineHome size={16} />
            </div>
          </div>
          <div className={`flex pl-2 items-center text-themeTextLight`}>
            <BiChevronsRight size={14} />
          </div>
        </div>
        {breadcrumbList.map((itemRef: BreadcrumbMenuType, index: number) => {
          return (
            <div key={v4()} className={`flex`}>
              {itemRef.url != "dashboard" &&
              index + 1 != breadcrumbList.length ? (
                <div
                  className={`cursor-pointer`}
                  onClick={() => {
                    window.location.href =
                      process.env.NEXT_PUBLIC_WEB_URL + "/" + itemRef.url;
                  }}
                >
                  <div
                    key={v4()}
                    className={`flex hover:border-b pt-1 text-themeTextLight text-xs space-x-2 items-center`}
                  >
                    <div>{itemRef.name}</div>
                  </div>
                </div>
              ) : (
                <div
                  key={v4()}
                  className={`flex p-1 rounded-md font-medium text-themeTextLight text-xs space-x-2 items-center`}
                >
                  <div>{itemRef.name}</div>
                </div>
              )}
              {index + 1 != breadcrumbList.length && (
                <div className={`flex pl-2  items-center text-themeTextLight`}>
                  <BiChevronsRight size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
