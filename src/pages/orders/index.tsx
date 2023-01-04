import { AxiosInstance } from "axios";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import BadgeGreen from "../../components/badges/BadgeGreen";
import BadgeRed from "../../components/badges/BadgeRed";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { TableButtonSolid } from "../../components/buttons/TableButtonSolid";
import { BodyCard } from "../../components/cards/BodyCard";
import InputDate from "../../components/input/InputDate";
import InputSelect from "../../components/input/InputSelect";
import InputText from "../../components/input/InputText";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";
import { FormOrders } from "../../components/templates/forms/FormOrders";
import YesNoTemplate from "../../components/templates/YesNoTemplate";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";
import { ClientType } from "../../types/ClientType";
import { OrderType } from "../../types/OrderType";
import { SelectType } from "../../types/SelectType";
import { TableType } from "../../types/TableType";
import { FormatMoney } from "../../utils/FormatMoney";

const Index = ({ loadedTables, loadedClients, loadedOrders }: any) => {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user?.permissions.includes("manage_orders"))
      router.push("../dashboard");
  }, []);

  const [orders, setOrders] = useState<OrderType[]>(loadedOrders);

  const [pending, setPending] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);

  const clients: SelectType[] = loadedClients;
  const tables: SelectType[] = loadedTables;

  const { register, handleSubmit, setValue } = useForm();

  const { setIsLoading } = useContext(AuthContext);

  const getOrders = async () => {
    setPending(true);
    await api.get("orders").then(({ data }: any) => {
      setOrders(data);
      setPending(false);
    });
  };

  const columns: any = [
    {
      name: "Número",
      selector: (row: any) => row.number,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Mesa/Cliente",
      selector: (row: any) => row.tableClient,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Data/Hora",
      selector: (row: any) => row.date,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Valor total",
      selector: (row: any) => row.totalValue,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Valor pago",
      selector: (row: any) => row.paidValue,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Situação",
      selector: (row: any) => row.situation,
      sortable: true,
      center: true,

      allowOverflow: true,
    },

    {
      name: "Ações",
      selector: (row: any) => row.actions,
      center: true,

      allowOverflow: true,
    },
  ];

  const data: any[] = orders.map((order: OrderType) => {
    return {
      number: order.id,
      tableClient: `${order.table.number} - ${order.client.name}`,
      date: moment(order.date).format("DD/MM/YYYY - HH:mm"),
      totalValue: FormatMoney(order.total_value),
      paidValue: FormatMoney(order.paid_value),
      situation: order.is_closed ? (
        <BadgeRed text={"Fechado"} />
      ) : (
        <BadgeGreen text="Aberto" />
      ),
      actions: (
        <div className={`flex flex-wrap`}>
          <div>
            <TableButtonSolid
              id={order.id}
              tooltip={`Editar`}
              icon={
                <MdOutlineModeEditOutline
                  className={`filter hover:drop-shadow m-1`}
                  size={18}
                />
              }
              color={"success"}
              onClick={async () => {
                await Promise.resolve(
                  setModalTemplate(
                    <FormOrders
                      clients={clients}
                      id={order.id}
                      handleClear={handleClear}
                      setModal={setModal}
                    />
                  )
                ).then(() => {
                  setModal(true);
                });
              }}
            />
          </div>
          <div>
            <TableButtonSolid
              id={order.id}
              tooltip={`Excluir`}
              icon={
                <BiTrash size={18} className={`filter hover:drop-shadow m-1`} />
              }
              color={"danger"}
              onClick={() => {
                toast.info(
                  <YesNoTemplate onClickYes={() => handleModalYes(order.id)} />,
                  {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                  }
                );
              }}
            />
          </div>
        </div>
      ),
    };
  });

  const newButton: JSX.Element = (
    <div className={`flex p-2`}>
      <ButtonSolid
        id={"new"}
        label={"Cadastrar"}
        color={"primary"}
        onClick={async () => {
          await Promise.resolve(
            setModalTemplate(
              <FormOrders
                clients={clients}
                handleClear={handleClear}
                setModal={setModal}
              />
            )
          ).then(() => {
            setModal(true);
          });
        }}
      />
    </div>
  );

  const handleModalYes = async (id: string) => {
    setIsLoading(true);
    await api
      .delete(`orders/${id}`)
      .then(async () => {
        SuccessAlert("Registro excluído com sucesso");
        await getOrders();
        setIsLoading(false);
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
        setIsLoading(false);
      });
  };

  const handleSearch = (data: any) => {
    setPending(true);

    if (data.date) data.date = moment(data.date).format("YYYY-MM-DD");

    api.post("orders/filters", data).then(({ data }) => {
      setOrders(data);
      setPending(false);
    });
  };

  const handleClear = () => {
    setValue("id", undefined);
    setValue("date", undefined);
    setValue("client", undefined);
    setValue("table", undefined);
    setValue("isClosed", undefined);

    (document.getElementById("search") as any).click();

    return;
  };

  const isClosedOptions: SelectType[] = [
    {
      value: "false",
      label: "Aberto",
    },
    {
      value: "true",
      label: "Fechado",
    },
  ];

  return (
    <>
      {modal && modalTemplate}
      <Navigation>
        <div className={`px-3 w-full min-h-screen`}>
          <BodyCard title={`Pedidos`} newButton={newButton}>
            <div className="px-2 pt-2 pb-6">
              <div className={`py-4`}>
                {/* --------------FILTERS ------------------------------ */}
                <form onSubmit={handleSubmit(handleSearch)}>
                  <div className={`grid grid-cols-12 py-4`}>
                    <div className="p-2 lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputText
                        register={register("id")}
                        id={`id`}
                        name={"id"}
                        placeholder={"Pesquise pelo número..."}
                        label={"Número"}
                      />
                    </div>
                    <div className="p-2 lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputSelect
                        register={register("client")}
                        id={`client`}
                        name={"client"}
                        placeholder={"Selecione um cliente..."}
                        label={"Cliente"}
                        options={clients}
                        setValue={setValue}
                      />
                    </div>
                    <div className="p-2 lg:col-span-34 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputDate
                        register={register("date")}
                        id={`date`}
                        name={"date"}
                        label={"Data"}
                        setValue={setValue}
                      />
                    </div>
                    <div className="p-2 lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputSelect
                        register={register("table")}
                        id={`table`}
                        name={"table"}
                        placeholder={"Selecione uma mesa..."}
                        label={"Mesa"}
                        options={tables}
                        setValue={setValue}
                      />
                    </div>
                    <div className="p-2 lg:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputSelect
                        register={register("isClosed")}
                        id={`isClosed`}
                        name={"isClosed"}
                        placeholder={"Selecione a situação..."}
                        label={"Situação"}
                        options={isClosedOptions}
                        setValue={setValue}
                      />
                    </div>
                  </div>
                  <div
                    className={`flex w-full space-x-2 items-end justify-end`}
                  >
                    <div className={`sm:w-36 w-44`}>
                      <ButtonSolid
                        id={"search"}
                        label={"Pesquisar"}
                        color={"secondary"}
                        type={"submit"}
                      />
                    </div>
                    <div className={`sm:w-36 w-44`}>
                      <ButtonSolid
                        id={"clear"}
                        label={"Limpar"}
                        color={"warning"}
                        onClick={() => handleClear()}
                      />
                    </div>
                  </div>
                </form>
                {/* ----------------------------------------------------- */}
              </div>
              <SimpleTable columns={columns} data={data} pending={pending} />
            </div>
          </BodyCard>
        </div>
      </Navigation>
    </>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const apiClient: AxiosInstance = getApiClient(ctx);

  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "../login",
        permanent: false,
      },
    };
  }

  const loadedTables: SelectType[] | void = await apiClient
    .get("tables")
    .then(({ data }: any) =>
      data.map((table: TableType) => {
        return {
          value: table.id,
          label: table.number,
        };
      })
    );

  const loadedClients: SelectType[] | void = await apiClient
    .get("clients")
    .then(({ data }: any) =>
      data.map((client: ClientType) => {
        return {
          value: client.id,
          label: client.name,
        };
      })
    );

  const loadedOrders: OrderType[] = await apiClient
    .get("orders")
    .then(({ data }: any) => data);

  return {
    props: {
      loadedTables: loadedTables,
      loadedClients: loadedClients,
      loadedOrders: loadedOrders,
    },
  };
};
