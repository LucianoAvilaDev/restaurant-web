import { AxiosError } from "axios";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CardType } from "../../../types/CardType";
import { ClientType } from "../../../types/ClientType";
import { OrderType } from "../../../types/OrderType";
import { SelectType } from "../../../types/SelectType";
import { TableType } from "../../../types/TableType";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { InnerCard } from "../../components/cards/InnerCard";
import SmallCard from "../../components/cards/SmallCard";
import Navigation from "../../components/navigation/Navigation";
import DashboardTable from "../../components/templates/DashboardTable";
import { FormOrders } from "../../components/templates/forms/FormOrders";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import validateAuth from "../../services/validateAuth";

ChartJS.register(ArcElement, Tooltip, Legend);

const index = () => {
  const { user } = useContext(AuthContext);

  const [tableCards, setTableCards] = useState<CardType[]>([]);
  const [orderCards, setOrderCards] = useState<CardType[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [clients, setClients] = useState<SelectType[]>([]);
  const [modal, setModal] = useState<boolean>();
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);
  const router = useRouter();

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
            color: "primary",
          },
          {
            title: "Mesas Disponíveis",
            value: `${data.length - occupiedTables} / ${data.length}`,
            color: "secondary",
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
            color: "info",
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
        <div className={`w-full`}>
          <div className="flex flex-col space-y-4">
            <div className={`text-2xl font-medium px-3 space-y-2 w-full`}>
              {`Bem-vindo, ${user?.name}!`}
            </div>
            <div className="flex">
              <div className={`px-3 space-y-4  w-full`}>
                <InnerCard
                  title={`Dados de Hoje, ${moment().format(
                    "DD/MM/YYYY [às] HH:mm"
                  )}`}
                >
                  <div className="px-2  flex-wrap space-x-4 py-4 grid grid-cols-12">
                    {[...tableCards, ...orderCards].map((card: CardType) => {
                      return (
                        <div
                          className={`col-span-6 sm:col-span-4 md:col-span-3`}
                        >
                          <SmallCard
                            title={card.title}
                            value={card.value}
                            color={card.color}
                          />
                        </div>
                      );
                    })}
                  </div>
                </InnerCard>
                <InnerCard title={`Mesas`}>
                  <div className={`flex flex-wrap justify-center p-2`}>
                    {tables.map((table: any) => {
                      return (
                        <DashboardTable
                          table={table}
                          onClick={async () => {
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

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
