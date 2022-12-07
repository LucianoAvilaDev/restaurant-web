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
  icon: any;
  url: string;
  ref: string;
};

export const BreadcrumbMenus: BreadcrumbMenuType[] = [
  {
    name: "Tela Inicial",
    icon: <AiOutlineHome size={10} />,
    ref: "dashboard",
    url: "dashboard",
  },
  {
    name: "Pedidos",
    icon: <BsLayoutTextSidebarReverse size={10} />,
    ref: "orders",
    url: "orders",
  },
  {
    name: "Refeições",
    icon: <IoFastFoodOutline size={10} />,
    ref: "meals",
    url: "meals",
  },
  {
    name: "Clientes",
    icon: <HiOutlineUsers size={10} />,
    ref: "clients",
    url: "clients",
  },
  {
    name: "Mesas",
    icon: <GiTable size={10} />,
    ref: "tables",
    url: "tables",
  },
  {
    name: "Usuários",
    icon: <IoPeopleCircleSharp size={10} />,
    ref: "users",
    url: "users",
  },
  {
    name: "Perfis",
    icon: <RiProfileLine size={10} />,
    ref: "roles",
    url: "roles",
  },
  {
    name: "Novo",
    icon: <AiOutlinePlus size={10} />,
    ref: "create",
    url: "#",
  },
  {
    name: "Editar",
    icon: <BiEditAlt size={10} />,
    ref: "edit",
    url: "#",
  },
];
