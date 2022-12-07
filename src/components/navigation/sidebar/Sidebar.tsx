import React, { useEffect, useState } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import { v4 } from "uuid";
import { Menus, MenuType } from "./Menus";

const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState<string>("w-16");
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const [urlRef, setUrlRef] = useState<string>("");

  useEffect(() => {
    setSidebarWidth(openSidebar ? "w-64" : "w-16");
  }, [openSidebar]);

  useEffect(() => {
    if (document)
      setUrlRef(
        document.location.href.replace(
          process.env.NEXT_PUBLIC_API_URL ?? "",
          ""
        )
      );
  }, []);

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // MENU SEM SUBMENU
  const simpleMenu: any = (menu: MenuType) => {
    return (
      <a
        href={menu.url}
        key={v4()}
        onClick={() => {
          setUrlRef(menu.url);
        }}
      >
        <li
          key={v4()}
          className={`${
            urlRef.includes(menu.url)
              ? "border-l-4 border-sidebarMenuBorder cursor-pointer bg-sidebarSelectedMenu text-sidebarTextHover"
              : "text-sidebarTextColor border-transparent"
          } flex py-3 border-l-4  text-sm hover:border-l-4 hover:border-sidebarMenuBorder hover:cursor-pointer hover:bg-sidebarMenuHover hover:text-sidebarTextHover`}
        >
          <div className={`px-2`}>{menu.icon}</div>
          <div className={`truncate ${!openSidebar ? "invisible" : ""}`}>
            {menu.name}
          </div>
        </li>
      </a>
    );
  };

  //SUBMENU
  const subMenu: any = (menu: MenuType) => {
    return (
      <a key={v4()} href={menu.url} onClick={() => setUrlRef(menu.url)}>
        <li
          key={v4()}
          className={`${
            urlRef.includes(menu.url)
              ? "border-sidebarSubMenuBorder cursor-pointer bg-sidebarSelectedMenu text-sidebarTextHover"
              : " border-transparent"
          }
          flex py-3 text-sm hover:cursor-pointer hover:bg-sidebarMenuHover hover:text-sidebarTextHover`}
        >
          <div className={`px-2`}>{menu.icon}</div>
          <div className={`truncate ${!openSidebar ? "invisible" : ""}`}>
            {menu.name}
          </div>
        </li>
      </a>
    );
  };

  // MENU COM SUBMENU
  const nestedMenu: any = (menu: MenuType) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const handleOpenMenu = () => {
      setOpenMenu(!openMenu);
    };

    return (
      <li
        key={v4()}
        className={`flex text-sidebarTextColor text-sm border-transparent `}
        onClick={() => handleOpenMenu()}
      >
        <div className="flex flex-col w-full">
          <div
            className={`${
              openMenu
                ? "border-sidebarMenuBorder text-sidebarTextColor"
                : " border-transparent "
            } flex py-4 border-l-4 hover:border-l-4 hover:border-sidebarMenuBorder hover:cursor-pointer hover:bg-sidebarMenuHover hover:text-red-800`}
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
            <ul
              className={`bg-sidebarSubMenu border-l-4 border-sidebarMenuBorder `}
            >
              {menu.submenus.map((currentMenu: MenuType) => {
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
      {/* SIDEBAR */}
      <div
        className={`${sidebarWidth} transition-all z-20 shadow-md bg-sidebarMenuBgColor min-h-screen`}
      >
        {/* HEADER */}
        <div className={`flex bg-sidebarHeaderColor py-2 justify-center`}>
          {openSidebar ? (
            <div
              className={`flex text-xl italic font-medium text-sidebarHeaderText px-2 pt-2`}
            >
              Restaurante
            </div>
          ) : null}
          <div className={`px-2 pt-2`}>
            <button
              className={`p-0.5 rounded-md transition-all text-sidebarHeaderIconColor hover:bg-sidebarHeaderIconBgHover hover:text-sidebarHeaderIconHover`}
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
        <div className={`flex flex-col my-4 transition-all`}>
          <ul>
            {Menus.map((menu: MenuType) => {
              if (menu.submenus.length == 0) return simpleMenu(menu);

              return nestedMenu(menu);
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
