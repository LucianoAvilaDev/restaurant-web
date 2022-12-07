import { AiOutlineHome } from "react-icons/ai";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { IoFastFoodOutline, IoPeopleCircleSharp } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import { FaRegAddressCard } from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";
import { GiTable } from "react-icons/gi";

export type MenuType = {
  name: string;
  icon: any;
  permissions: string[];
  url: string;
  submenus: MenuType[];
};

export const Menus: MenuType[] = [
  {
    name: "Tela Inicial",
    icon: <AiOutlineHome size={17} />,
    url: "dashboard",
    permissions: [],
    submenus: [],
  },
  {
    name: "Pedidos",
    icon: <BsLayoutTextSidebarReverse size={17} />,
    url: "orders",
    permissions: ["manage_orders"],
    submenus: [],
  },
  {
    name: "Refeições",
    icon: <IoFastFoodOutline size={17} />,
    url: "meals",
    permissions: ["manage_meals"],
    submenus: [],
  },
  {
    name: "Clientes",
    icon: <HiOutlineUsers size={17} />,
    url: "clients",
    permissions: ["manage_clients"],
    submenus: [],
  },
  {
    name: "Mesas",
    icon: <GiTable size={17} />,
    url: "tables",
    permissions: [],
    submenus: [],
  },
  {
    name: "Controle de Acesso",
    icon: <FaRegAddressCard size={17} />,
    url: "#",
    permissions: ["manage_users", "manage_roles"],
    submenus: [
      {
        name: "Usuários",
        icon: <IoPeopleCircleSharp size={17} />,
        url: "users",
        permissions: ["manage_users"],
        submenus: [],
      },
      {
        name: "Perfis",
        icon: <RiProfileLine size={17} />,
        url: "roles",
        permissions: ["manage_roles"],
        submenus: [],
      },
    ],
  },
];
