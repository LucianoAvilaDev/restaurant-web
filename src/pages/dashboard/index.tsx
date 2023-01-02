import { AxiosError } from "axios";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { InnerCard } from "../../components/cards/InnerCard";
import SmallCard from "../../components/cards/SmallCard";
import Navigation from "../../components/navigation/Navigation";
import DashboardTable from "../../components/templates/DashboardTable";
import { FormOrders } from "../../components/templates/forms/FormOrders";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";
import { CardType } from "../../types/CardType";
import { ClientType } from "../../types/ClientType";
import { OrderType } from "../../types/OrderType";
import { SelectType } from "../../types/SelectType";
import { TableType } from "../../types/TableType";

const Index = () => {
  const { user } = useContext(AuthContext);

  const [tableCards, setTableCards] = useState<CardType[]>([]);
  const [orderCards, setOrderCards] = useState<CardType[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [clients, setClients] = useState<SelectType[]>([]);
  const [modal, setModal] = useState<boolean>();
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);

  const GetClients = async () => {
    await api.get("clients").then(({ data }: any) => {
      setClients(
        data.map((client: ClientType) => {
          return {
            value: client.id,
            label: client.name,
          };
        })
      );
    });
  };

  const getData = async () => {
    await api
      .get("tables")
      .then(({ data }: any) => {
        const occupiedTables = data.filter(
          (table: TableType) => !table.is_available
        ).length;
        setTableCards([
          {
            title: "Mesas Ocupadas",
            value: `${occupiedTables} / ${data.length}`,
          },
          {
            title: "Mesas Disponíveis",
            value: `${data.length - occupiedTables} / ${data.length}`,
          },
        ]);
      })
      .catch((e: AxiosError) => ErrorAlert(e.response?.data as string));

    await api
      .post("orders/filters", { date: moment().format("YYYY-MM-DD") })
      .then(({ data }: any) => {
        const openOrders = data.filter(
          (order: OrderType) => !order.is_closed
        ).length;
        setOrderCards([
          {
            title: "Pedidos abertos",
            value: `${openOrders} / ${data.length}`,
          },
        ]);
      })
      .catch((e: AxiosError) => ErrorAlert(e.response?.data as string));

    await api.get("all-tables-and-orders").then(({ data }) => {
      setTables(data);
    });
  };

  useEffect(() => {
    getData();
    GetClients();
  }, []);

  return (
    <>
      {modal && modalTemplate}
      <Navigation>
        <div className={`w-full min-h-screen`}>
          <div className="flex flex-col md:space-y-4">
            <div
              className={`hidden md:flex text-lg md:text-2xl font-medium px-3 space-y-2 w-full`}
            >
              {`Bem-vindo, ${user?.name}!`}
            </div>
            <div className="flex">
              <div className={`px-3 space-y-4  w-full`}>
                <InnerCard
                  title={`Dados de Hoje, ${moment().format(
                    "DD/MM/YYYY [às] HH:mm"
                  )}`}
                >
                  <div className="px-2 flex-wrap space-y-4 sm:space-y-0 md:space-x-4 py-4 grid grid-cols-12">
                    {[...tableCards, ...orderCards].map((card: CardType) => {
                      return (
                        <div
                          key={v4()}
                          className={`col-span-12 sm:col-span-4 lg:col-span-3 xl:col-span-2`}
                        >
                          <SmallCard title={card.title} value={card.value} />
                        </div>
                      );
                    })}
                  </div>
                </InnerCard>
                <InnerCard title={`Mesas`}>
                  {user?.permissions.includes("manage_orders") && (
                    <div className={`text-xs md:text-sm text-justify`}>
                      Cique em uma mesa para{" "}
                      <span className={`text-green-600 font-bold`}>
                        CADASTRAR
                      </span>{" "}
                      ou{" "}
                      <span className={`text-red-500 font-bold`}>EDITAR</span>{" "}
                      um Pedido.
                    </div>
                  )}
                  <div
                    className={`flex flex-wrap justify-center md:justify-start p-2`}
                  >
                    {tables.map((table: any) => {
                      return (
                        <div key={v4()}>
                          <DashboardTable
                            table={table}
                            onClick={async () => {
                              if (!user?.permissions.includes("manage_orders"))
                                return;
                              await Promise.resolve(
                                setModalTemplate(
                                  <FormOrders
                                    clients={clients}
                                    id={
                                      table.orders
                                        ? table.orders[0].id
                                        : undefined
                                    }
                                    handleClear={async () => {
                                      getData();
                                    }}
                                    setModal={setModal}
                                    table={table}
                                  />
                                )
                              ).then(() => {
                                setModal(true);
                              });
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </InnerCard>
              </div>
            </div>
          </div>
        </div>
      </Navigation>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient: any = getApiClient(ctx);

  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "../login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
