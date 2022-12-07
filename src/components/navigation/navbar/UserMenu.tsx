import Link from "next/link";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { v4 } from "uuid";

const UserMenu = () => {
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);

  return (
    <div className={`absolute  flex-col`}>
      <div
        className={`cursor-pointer rounded-full bg-navbarTextColor hover:bg-navbarTextHover hover:shadow-lg hover:text-navbarIconHover text-navbarIconColor`}
      >
        <FaUserCircle
          size={30}
          onMouseEnter={() => setUserMenuOpen(true)}
          onMouseLeave={() => setUserMenuOpen(false)}
        />
      </div>
      <div className={`fixed rounded-md shadow-md right-3 bg-white`}>
        {/* MENU USER NO NAVBAR */}
        {userMenuOpen ? (
          <div className={`flex rounded-md bg-navbarUserBg`}>
            <ul
              key={v4()}
              className={`p-1 truncate font-medium text-navbarUserText `}
            >
              <div
                className={`flex flex-col items-center justify-center px-2 py-3`}
              >
                <FaUserCircle
                  size={48}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                />
                <div>Luciano Thadeu</div>
              </div>
              <div className={`text-center bg-navbarUserMenu text-xs`}>
                <div>
                  <Link key={v4()} href="edit-profile">
                    <li
                      key={v4()}
                      className={`px-2 py-1 cursor-pointer rounded-sm hover:text-navbarUserTextHover hover:bg-navbarUserMenuHover`}
                    >
                      Meus Dados
                    </li>
                  </Link>
                </div>
                <div>
                  <Link key={v4()} href="logout">
                    <li
                      key={v4()}
                      className={`px-2 py-1 cursor-pointer rounded-sm hover:text-navbarUserTextHover hover:bg-navbarUserMenuHover`}
                    >
                      Sair
                    </li>
                  </Link>
                </div>
              </div>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserMenu;
