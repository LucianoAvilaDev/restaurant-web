import { AxiosError } from "axios";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useContext, useEffect, useState } from "react";
import { CardType } from "../../../types/CardType";
import { OrderType } from "../../../types/OrderType";
import { TableType } from "../../../types/TableType";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { InnerCard } from "../../components/cards/InnerCard";
import SmallCard from "../../components/cards/SmallCard";
import Navigation from "../../components/navigation/Navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import validateAuth from "../../services/validateAuth";

const index = () => {
  const { user } = useContext(AuthContext);

  const [tableCards, setTableCards] = useState<CardType[]>([]);
  const [orderCards, setOrderCards] = useState<CardType[]>([]);

  const getTableCards = async () => {
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
  };

  const getOrdersCards = async () => {
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
  };

  useEffect(() => {
    getTableCards();
    getOrdersCards();
  }, []);

  return (
    <Navigation>
      <div className={`space-y-4 w-full`}>
        <div className={`flex text-2xl font-medium px-3 space-y-2 w-full`}>
          {`Bem-vindo, ${user?.name}!`}
        </div>
        <div className={`flex px-3 md:w-1/2 w-full`}>
          <InnerCard
            title={`Dados de Hoje, ${moment().format("DD/MM/YYYY [às] HH:mm")}`}
          >
            <div className="flex p-4 w-full">
              <div className="px-2 flex-wrap space-x-4 py-4 grid grid-cols-12">
                {[...tableCards, ...orderCards].map((card: CardType) => {
                  return (
                    <div className={`col-span-6 sm:col-span-4 md:col-span-4`}>
                      <SmallCard
                        title={card.title}
                        value={card.value}
                        color={card.color}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InnerCard>
        </div>
      </div>
    </Navigation>
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
