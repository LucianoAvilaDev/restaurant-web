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
      return { url: "tables", name: "Mesas" };

    case "roles":
      return { url: "roles", name: "Perfis" };

    case "users":
      return { url: "users", name: "Usuários" };

    case "login":
      return { url: "dashboard", name: "Tela Inicial" };

    default:
      return { url: ref, name: ref };
  }
};
