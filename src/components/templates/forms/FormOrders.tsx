import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { useQuery } from "react-query";
import { OrderItemsType } from "../../../../types/OrderItemType";
import { SelectType } from "../../../../types/SelectType";
import { OrdersSchema } from "../../../schemas/OrdersSchema";
import { api } from "../../../services/api";
import { FormatDateTime } from "../../../utils/FormatDateTime";
import { FormatMoney } from "../../../utils/FormatMoney";
import { SanitizeCpf } from "../../../utils/SanitizeCpf";
import { ErrorAlert } from "../../alerts/ErrorAlert";
import { InfoAlert } from "../../alerts/InfoAlert";
import { SuccessAlert } from "../../alerts/SuccessAlert";
import { ButtonSolid } from "../../buttons/ButtonSolid";
import { TableButtonSolid } from "../../buttons/TableButtonSolid";
import { BodyCard } from "../../cards/BodyCard";
import InputDateTime from "../../input/InputDateTime";
import InputSelect from "../../input/InputSelect";
import Loader from "../../loader/Loader";
import SimpleTable from "../../tables/SimpleTable";
import YesNoTemplate from "../YesNoTemplate";

type Props = {
  id?: string;
  setModal: Function;
  handleClear: Function;
  clients: SelectType[];
  tables: SelectType[];
};

export const FormOrders = ({
  id,
  clients,
  tables,
  handleClear,
  setModal,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<any>([]);
  const [selectedValues, setSelectedValues] = useState<{
    client: SelectType;
    table: SelectType;
  }>();
  const [selectedtable, setSelectedtable] = useState<any>([]);
  const [pending, setPending] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(OrdersSchema()),
  });

  const columns: any = [
    {
      name: "Quantidade",
      selector: (row: any) => row.quanitty,
      sortable: true,
      center: true,
      width: "10%",
    },
    {
      name: "Refeição",
      selector: (row: any) => row.meal,
      sortable: true,
      center: true,
      width: "30%",
    },
    {
      name: "Preço",
      selector: (row: any) => row.price,
      sortable: true,
      center: true,
      width: "15%",
    },
    {
      name: "Observação",
      selector: (row: any) => row.observation,
      sortable: true,
      center: true,
      width: "30%",
    },
    {
      name: "Ações",
      selector: (row: any) => row.actions,
      center: true,
      width: "15%",
    },
  ];

  const data: any[] = order.orderItems?.map((item: OrderItemsType) => {
    return {
      quantity: item.quantity,
      meal: item.meal.name,
      price: FormatMoney(item.price),
      observation: (
        <div className={`flex flex-wrap p-1`}>
          <div>{item.observation}</div>
        </div>
      ),
      actions: (
        <div className={`flex flex-wrap`}>
          <div>
            <TableButtonSolid
              id={order.id}
              tooltip={`Excluir`}
              icon={
                <BiTrash size={18} className={`filter hover:drop-shadow m-1`} />
              }
              color={"danger"}
              onClick={() => {
                InfoAlert(
                  <YesNoTemplate onClickYes={() => handleModalYes(order.id)} />
                );
              }}
            />
          </div>
        </div>
      ),
    };
  });

  const handleModalYes = (id: string) => {
    const newItems = order.orderItems.filter(
      (item: OrderItemsType) => item.id !== id
    );

    setOrder({ ...order, orderItems: newItems });
  };

  const handleSave = (data: any) => {
    setIsLoading(true);
    if (id) {
      api
        .put(`orders/${id}`, { ...data, cpf: SanitizeCpf(data.cpf) })
        .then(async () => {
          SuccessAlert("Registro salvo com sucesso!");
          setIsLoading(false);
          setModal(false);
          await handleClear();
          return;
        })
        .catch((e: any) => {
          ErrorAlert(e.message);
          setIsLoading(false);
          setIsLoading(false);
          return;
        });
    } else {
      api
        .post(`orders`, { ...data, cpf: SanitizeCpf(data.cpf) })
        .then(async () => {
          SuccessAlert("Registro salvo com sucesso!");
          setIsLoading(false);
          setModal(false);
          await handleClear();
          return;
        })
        .catch((e: any) => {
          ErrorAlert(e.message);
          setIsLoading(false);
          setIsLoading(false);
          return;
        });
    }
  };

  const handleCancel = () => {
    setModal(false);
  };

  const getOrder = async (id: string) => {
    await api
      .get(`orders/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setOrder(data);

          setSelectedValues({
            client: { value: data.client.id, label: data.client.name },
            table: { value: data.table.id, label: data.table.number },
          });

          setValue("clientId", data.client.id ?? "");
          setValue("tableId", data.table.id ?? "");
          setValue("date", data.date ? FormatDateTime(data.date) : "");
          setValue("totalValue", data.total_value ?? "");
          setValue("paidValue", data.paid_value ?? []);
        }
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
      });
  };

  const getInitialData = () => {
    if (id) {
      getOrder(id);
    }
  };

  useQuery("FormOrders", getInitialData);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-screen flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`max-h-[80vh] max-w-[80vw]`}>
          <BodyCard title={`${id ? "Editar" : "Cadastrar"} Pedido`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <input
                      type="hidden"
                      value={order.orderItems}
                      {...register("orderItems")}
                    />

                    <div className="p-2 sm:col-span-6 col-span-12">
                      <InputSelect
                        register={register("client")}
                        id={`clientId`}
                        name={"clientId"}
                        placeholder={"Selecione um cliente..."}
                        label={"Cliente"}
                        options={clients}
                        setValue={setValue}
                      />
                    </div>
                    <div className="p-2 sm:col-span-6 col-span-12">
                      <InputSelect
                        register={register("tableId")}
                        id={`tableId`}
                        name={"tableId"}
                        placeholder={"Selecione uma Mesa..."}
                        label={"Mesa"}
                        options={tables}
                        setValue={setValue}
                      />
                    </div>
                    <div className="p-2 sm:col-span-6 col-span-12">
                      <InputDateTime
                        register={register("date")}
                        id={`date`}
                        name={"date"}
                        label={"Data"}
                        setValue={setValue}
                      />
                    </div>
                    <div className={`col-span-12 py-4`}>
                      <SimpleTable
                        columns={columns}
                        data={data}
                        pending={pending}
                      />
                    </div>
                  </div>
                  <div
                    className={`flex w-full space-x-4 items-end justify-end`}
                  >
                    <div className={`sm:w-36 w-44`}>
                      <ButtonSolid
                        id={"save"}
                        label={"Salvar"}
                        color={"success"}
                        type={"submit"}
                      />
                    </div>
                    <div className={`sm:w-36 w-44`}>
                      <ButtonSolid
                        id={"cancel"}
                        label={"Cancelar"}
                        color={"default"}
                        onClick={() => handleCancel()}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </BodyCard>
        </div>
      </div>
    </>
  );
};
