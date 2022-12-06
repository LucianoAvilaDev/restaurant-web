import { unstable_useId } from "@mui/material";
import { randomUUID } from "crypto";
import React, { useEffect, useState } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { v4 } from "uuid";
import { menusTest, menuType } from "./menusTeste";
import Link from "next/link";

const Sidebar = (props: any) => {
  const [sidebarWidth, setSidebarWidth] = useState<string>("w-16");
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const [urlRef, setUrlRef] = useState<string>("");

  useEffect(() => {
    setSidebarWidth(openSidebar ? "w-64" : "w-16");
  }, [openSidebar]);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // MENU SEM SUBMENU
  const simpleMenu: any = (menu: menuType) => {
    return (
      <Link key={v4()} href={menu.url} onClick={() => setUrlRef(menu.url)}>
        <li
          key={v4()}
          className={`${
            urlRef.includes(menu.url)
              ? "border-l-4 border-red-500 cursor-pointer bg-gray-50/70 text-red-800"
              : ""
          } flex py-3 border-l-4 border-transparent text-gray-50 text-sm hover:border-l-4 hover:border-red-500 hover:cursor-pointer hover:bg-gray-50/70 hover:text-red-800`}
        >
          <div className={`px-2`}>{menu.icon}</div>
          <div className={`truncate ${!openSidebar ? "invisible" : ""}`}>
            {menu.name}
          </div>
        </li>
      </Link>
    );
  };

  // SUBMENU
  const subMenu: any = (menu: menuType) => {
    return (
      <Link key={v4()} href={menu.url} onClick={() => setUrlRef(menu.url)}>
        <li
          key={v4()}
          className={`${
            urlRef.includes(menu.url)
              ? "border-red-500 cursor-pointer bg-gray-50/70 text-red-800"
              : ""
          }
          flex py-3 text-gray-50 text-sm hover:cursor-pointer hover:bg-gray-50/70 hover:text-red-800`}
        >
          <div className={`px-2`}>{menu.icon}</div>
          <div className={`truncate ${!openSidebar ? "invisible" : ""}`}>
            {menu.name}
          </div>
        </li>
      </Link>
    );
  };

  // MENU COM SUBMENU
  const nestedMenu: any = (menu: menuType) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    return (
      <li
        key={v4()}
        className={`flex text-gray-50 text-sm border-transparent `}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <div className="flex flex-col w-full">
          <div
            className={`${
              openMenu ? "border-red-500 bg-gray-50/70 text-red-800" : ""
            } flex py-4 border-l-4 border-transparent hover:border-l-4 hover:border-red-500 hover:cursor-pointer hover:bg-gray-50/70 hover:text-red-800`}
          >
            <div className={`pl-2`}>{menu.icon}</div>
            {openSidebar ? (
              <div className={`pl-2 truncate`}>{menu.name}</div>
            ) : null}
            <button className={`px-2`}>
              {openMenu ? <BiChevronUp /> : <BiChevronDown />}
            </button>
          </div>
          {openMenu ? (
            <ul className="bg-red-900 border-l-4 border-red-500 transition-all">
              {menu.submenus.map((currentMenu: menuType) => {
                if (currentMenu.submenus.length == 0)
                  return subMenu(currentMenu);

                return nestedMenu(currentMenu);
              })}
            </ul>
          ) : null}
        </div>
      </li>
    );
  };

  return (
    <>
      <div className={`flex w-full `}>
        <div
          className={`${sidebarWidth} transition-all z-20 shadow-md bg-red-800 h-[100vh]`}
        >
          {/* HEADER */}
          <div className={`flex bg-red-700 py-2 justify-center`}>
            {openSidebar ? (
              <div
                className={`flex text-xl italic font-medium text-red-50 px-2 pt-2`}
              >
                Restaurante
              </div>
            ) : null}
            <div className={`px-2 pt-2`}>
              <button
                className={`p-0.5 rounded-md transition-all text-gray-50 hover:bg-gray-50/70 hover:text-red-700`}
                onClick={() => handleOpenSidebar()}
              >
                {openSidebar ? (
                  <BsArrowBarLeft size={24} />
                ) : (
                  <BsArrowBarRight size={24} />
                )}
              </button>
            </div>
          </div>
          {/* MENUS */}
          <div className={`flex flex-col my-4`}>
            <ul>
              {menusTest.map((menu: menuType) => {
                if (menu.submenus.length == 0) return simpleMenu(menu);

                return nestedMenu(menu);
              })}
            </ul>
          </div>
        </div>
        <div className={`flex flex-col justify-center w-full`}>
          <div className={`bg-red-500 h-[3.2rem] w-full`}>Navbar</div>
          <div className={`bg-gray-200 h-full w-full`}>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
