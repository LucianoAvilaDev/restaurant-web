import React, { useEffect, useState } from "react";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

import { v4 } from "uuid";
import { menus, menuType } from "./menus";
import Link from "next/link";

const Sidebar = (props: any) => {
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
  const simpleMenu: any = (menu: menuType) => {
    return (
      <Link key={v4()} href={menu.url} onClick={() => setUrlRef(menu.url)}>
        <li
          key={v4()}
          className={`${
            urlRef.includes(menu.url)
              ? "border-l-4 border-red-500 cursor-pointer bg-gray-50/70 text-red-800"
              : "text-gray-50 border-transparent"
          } flex py-3 border-l-4  text-sm hover:border-l-4 hover:border-red-500 hover:cursor-pointer hover:bg-gray-50/70 hover:text-red-800`}
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
              : " border-transparent"
          }
          flex py-3 text-sm hover:cursor-pointer hover:bg-gray-50/70 hover:text-red-800`}
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

    const handleOpenMenu = () => {
      setOpenMenu(!openMenu);
    };

    return (
      <li
        key={v4()}
        className={`flex text-gray-50 text-sm border-transparent `}
        onClick={() => handleOpenMenu()}
      >
        <div className="flex flex-col w-full">
          <div
            className={`${
              openMenu ? "border-red-500 text-gray-50" : " border-transparent "
            } flex py-4 border-l-4 hover:border-l-4 hover:border-red-500 hover:cursor-pointer hover:bg-gray-50/70 hover:text-red-800`}
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
            <ul className={`bg-red-900 border-l-4 border-red-500 `}>
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

  //USER MENU
  const userMenu: any = () => {
    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

    return (
      <div className={`absolute  flex-col`}>
        <div className={`cursor-pointer`}>
          <FaUserCircle
            size={30}
            color={"white"}
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          />
        </div>
        <div className={`fixed rounded-md shadow-md right-4 bg-white`}>
          {userMenuOpen ? (
            <div className={`flex rounded-md text-sm bg-white`}>
              <ul
                key={v4()}
                className={`p-1 divide-y text-red-800 font-medium`}
              >
                <div className={`flex justify-center p-2 `}>
                  <FaUserCircle
                    size={44}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  />
                  <div></div>
                </div>
                <div>
                  <Link key={v4()} href="edit-profile">
                    <li
                      key={v4()}
                      className={`px-2 py-1 cursor-pointer rounded-sm hover:bg-red-100`}
                    >
                      Meus Dados
                    </li>
                  </Link>
                </div>
                <div>
                  <Link key={v4()} href="logout">
                    <li
                      key={v4()}
                      className={`px-2 py-1 cursor-pointer rounded-sm hover:bg-red-100`}
                    >
                      Sair
                    </li>
                  </Link>
                </div>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`flex w-full`}>
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
          <div className={`flex flex-col my-4 TRANSITION-ALL`}>
            <ul>
              {menus.map((menu: menuType) => {
                if (menu.submenus.length == 0) return simpleMenu(menu);

                return nestedMenu(menu);
              })}
            </ul>
          </div>
        </div>
        <div className={`flex flex-col justify-center w-full`}>
          <div
            className={`flex items-center justify-end px-2 space-x-2 bg-red-700 h-16 w-full`}
          >
            {userMenu()}
          </div>
          <div className={`bg-gray-200 h-full w-full`}>{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
