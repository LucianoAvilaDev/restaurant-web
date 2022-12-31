import { useContext, useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";

import Link from "next/link";
import { v4 } from "uuid";
import { AuthContext } from "../../../contexts/AuthContext";
import { Menus, MenuType } from "./Menus";

const Sidebar = () => {
  const [sidebarWidth, setSidebarWidth] = useState<string>("w-60");
  const [pageMarginLeft, setPageMarginLeft] = useState<string>("md:pl-60");
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(true);
  const [urlRef, setUrlRef] = useState<string>("");

  const { user, ref, setRef, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    setSidebarWidth(openSidebar ? "w-60" : "w-16");
    setPageMarginLeft(openSidebar ? "md:pl-60 pl-16" : "pl-16");
  }, [openSidebar]);

  useEffect(() => {
    if (document){
      setUrlRef(
        document.location.href.replace(
          process.env.NEXT_PUBLIC_API_URL ?? "",
          ""
        )
      )
      setIsMediumScreen(window.innerWidth <= 768)
    }
  }, []);

  const userHasPermissions = (permissions:string[]) => {
    return permissions.length == 0  || user?.permissions.some( userPermission => permissions.includes(userPermission) )
  }

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // MENU SEM SUBMENU
  const SimpleMenu: any = (menu: MenuType) => {
    return (
      <Link
        href={menu.url}
        key={v4()}
        onClick={() => {
          setUrlRef(menu.url);
          setRef(menu.url);
          setIsLoading(true);
        }}
      >
        <li
          key={v4()}
          className={`${
            urlRef.includes(menu.url)
              ? "border-l-4 border-themeLight cursor-pointer bg-themeTextLight text-themeDark"
              : "text-themeTextLight border-transparent"
          } flex py-3 border-l-4  text-sm hover:border-l-4 hover:border-themeLight hover:cursor-pointer hover:bg-themeTextLight hover:text-themeDark`}
        >
          <div className={`px-2`}>{menu.icon}</div>
          <div className={`truncate ${!openSidebar ? "invisible" : ""}`}>
            {menu.name}
          </div>
        </li>
      </Link>
    );
  };

  //SUBMENU
  const SubMenu: any = (menu: MenuType) => {
    return (
      <Link
        key={v4()}
        href={menu.url}
        onClick={() => {
          setUrlRef(menu.url);
          setRef(menu.url);
          setIsLoading(true);
        }}
      >
        <li
          key={v4()}
          className={`${
            urlRef.includes(menu.url)
              ? "border-themeDark cursor-pointer bg-themeTextLight text-themeDark"
              : " border-transparent"
          }
          flex py-3 text-sm hover:cursor-pointer hover:bg-themeTextLight hover:text-themeDark`}
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
  const NestedMenu: any = (menu: MenuType) => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openByUrlRef, setOpenByUrlRef] = useState<boolean>(false);

    const handleOpenMenu = () => {
      setOpenMenu(!openMenu);
      setOpenByUrlRef(false);
    };

    useEffect(() => {
      const submenuPaths = menu.submenus.map((menu: MenuType) => menu.url);
      setOpenByUrlRef(submenuPaths.some((v) => ref.includes(v)));
    }, []);

    return (
      <li
        key={v4()}
        className={`flex text-themeTextLight text-sm border-transparent `}
        onClick={() => handleOpenMenu()}
      >
        <div className="flex flex-col w-full">
          <div
            className={`${
              openMenu || openByUrlRef
                ? "border-themeLight text-themeTextLight"
                : " border-transparent"
            } flex py-4 border-l-4 hover:border-l-4 hover:border-themeLight hover:cursor-pointer hover:bg-themeTextLight hover:text-red-800`}
          >
            <div className={`pl-2`}>{menu.icon}</div>
            {openSidebar ? (
              <div className={`pl-2 truncate`}>{menu.name}</div>
            ) : null}
            <button className={`px-2`}>
              {openMenu || openByUrlRef ? <BiChevronUp /> : <BiChevronDown />}
            </button>
          </div>
          {openMenu || openByUrlRef ? (
            <ul className={`bg-themeDarker border-l-4 border-themeLight `}>
              {menu.submenus.map((currentMenu: MenuType) => {
                if(userHasPermissions(currentMenu.permissions)){
                  if (currentMenu.submenus.length == 0)
                    return SubMenu(currentMenu);

                  return NestedMenu(currentMenu);
                }
              })}
            </ul>
          ) : null}
        </div>
      </li>
    );
  };

  return (
    <div>
      {/* SIDEBAR */}
      {isMediumScreen && <div className={`${pageMarginLeft}`}></div>}
      <div
        className={`${sidebarWidth} fixed md:relative transition-all min-h-screen h-full z-20 shadow-md bg-themeDark`}
      >
        {/* HEADER */}
        <div className={`flex shadow-md bg-themeMedium py-2 justify-center`}>
          {openSidebar ? (
            <div
              className={`flex text-xl italic font-medium text-themeTextLight px-2 pt-2`}
            >
              Restaurante
            </div>
          ) : null}
          <div className={`px-2 pt-2`}>
            <button
              className={`p-0.5 rounded-md transition-all text-themeTextLight hover:bg-themeTextLight hover:text-themeMedium`}
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
              if(userHasPermissions(menu.permissions)){
                if (menu.submenus.length == 0) return SimpleMenu(menu);
  
                return NestedMenu(menu);
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
