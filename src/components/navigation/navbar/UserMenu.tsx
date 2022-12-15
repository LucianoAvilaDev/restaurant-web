import Link from "next/link";
import React, { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { v4 } from "uuid";
import { AuthContext } from "../../../contexts/AuthContext";

const UserMenu = () => {
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  return (
    <div className={`absolute z-10 flex-col`}>
      <div
        className={`cursor-pointer rounded-full bg-navbarTextColor hover:bg-themeLight hover:shadow-lg hover:text-themeTextLight text-themeTextLight`}
      >
        <FaUserCircle size={30} onMouseEnter={() => setUserMenuOpen(true)} />
      </div>
      <div
        className={`fixed rounded-md shadow-md right-3 bg-white`}
        onMouseLeave={() => setUserMenuOpen(false)}
      >
        {/* MENU USER NO NAVBAR */}
        {userMenuOpen ? (
          <div className={`flex rounded-md w-full bg-themeTextLight`}>
            <ul
              key={v4()}
              className={`p-1 truncate font-medium text-themeTextDark `}
            >
              <div
                className={`flex flex-col border-b items-center justify-center px-2 py-3`}
              >
                <FaUserCircle
                  size={48}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                />
                <div>{user?.name}</div>
                <div className="text-xs italic font-bold">{user?.email}</div>
              </div>
              <div
                className={`text-center border-b divide-y bg-themeTextLight text-xs`}
              >
                <div>
                  <Link key={v4()} href="edit-profile">
                    <li
                      key={v4()}
                      className={`px-2 py-1 cursor-pointer rounded-sm hover:text-themeTextLight hover:bg-themeDark`}
                    >
                      Meus Dados
                    </li>
                  </Link>
                </div>
                <div>
                  <Link key={v4()} href="logout">
                    <li
                      key={v4()}
                      className={`px-2 py-1 cursor-pointer rounded-sm hover:text-themeTextLight hover:bg-themeDark`}
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
