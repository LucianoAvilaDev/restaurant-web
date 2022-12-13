import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import { IoFastFoodOutline, IoPeopleCircleSharp } from "react-icons/io5";
import { HiOutlineUsers } from "react-icons/hi";
import { FaRegAddressCard } from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";
import { GiTable } from "react-icons/gi";
import { Dashboard } from "@mui/icons-material";
import { BiEditAlt } from "react-icons/bi";

export type BreadcrumbMenuType = {
  name: string;
  ref: string;
};

export const GetBreadcrumbMenus = (ref: string) => {
  switch (ref) {
    case "dashboard":
      return { url: "dashboard", name: "Tela Inicial" };

    case "orders":
      return { url: "orders", name: "Pedidos" };

    case "meals":
      return { url: "meals", name: "Refeições" };

    case "clients":
      return { url: "clients", name: "Clientes" };

    case "tables":
      return { url: "tables", name: "Usuários" };

    case "roles":
      return { url: "roles", name: "Perfis" };

    case "create":
      return { url: "create", name: "Cadastrar" };

    case "edit":
      return { url: "edit", name: "Editar" };

    default:
      return { url: ref, name: ref };
  }
};

export const BreadcrumbMenus: BreadcrumbMenuType[] = [
  {
    name: "Tela Inicial",
    ref: "dashboard",
  },
  {
    name: "Pedidos",
    ref: "orders",
  },
  {
    name: "Refeições",
    ref: "meals",
  },
  {
    name: "Clientes",
    ref: "clients",
  },
  {
    name: "Mesas",
    ref: "tables",
  },
  {
    name: "Usuários",
    ref: "users",
  },
  {
    name: "Perfis",
    ref: "roles",
  },
  {
    name: "Novo",
    ref: "create",
  },
  {
    name: "Editar",
    ref: "edit",
  },
];
