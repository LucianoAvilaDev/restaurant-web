import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { useContext, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { v4 } from "uuid";
import { AuthContext } from "../../../contexts/AuthContext";
import { api } from "../../../services/api";
import { InfoAlert } from "../../alerts/InfoAlert";
import YesNoTemplate from "../../templates/YesNoTemplate";

const UserMenu = () => {
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await api.post("logout").then(() => {
      destroyCookie(undefined, "restaurantApp.token");
      router.push("login");
    });
  };

  return (
    <div className={`absolute z-10 flex-col`}>
      <div
        className={`cursor-pointer rounded-full bg-navbarTextColor hover:bg-themeLight hover:shadow-lg hover:text-themeTextLight text-themeTextLight`}
      >
        <FaUserCircle
          size={30}
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        />
      </div>
      <div
        className={`fixed rounded-md shadow-md right-3 bg-white`}
      >
        {/* MENU USER NO NAVBAR */}
        {userMenuOpen ? (
          <div className={`flex rounded-md w-full bg-white`}>
            <ul
              key={v4()}
              className={`p-1 truncate font-medium text-themeTextDark `}
            >
              <div
                className={`flex flex-col border-b items-center justify-center px-2 py-3`}
              >
                <FaUserCircle size={48} />
                <div>{user?.name}</div>
                <div className="text-xs italic font-bold">{user?.email}</div>
              </div>
              <div className={`text-center border-b divide-y bg-white text-xs`}>
                <div>
                  <li
                    key={v4()}
                    className={`px-2 py-1 cursor-pointer rounded-sm hover:text-themeTextLight hover:bg-themeDark`}
                  >
                    Meus Dados
                  </li>
                </div>
                <div>
                  <div
                    key={v4()}
                    onClick={() => {
                      InfoAlert(
                        <YesNoTemplate
                          text="Deseja realmente sair?"
                          onClickYes={handleLogout}
                        />
                      );
                    }}
                  >
                    <li
                      key={v4()}
                      className={`px-2 py-1 cursor-pointer rounded-sm hover:text-themeTextLight hover:bg-themeDark`}
                    >
                      Sair
                    </li>
                  </div>
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
