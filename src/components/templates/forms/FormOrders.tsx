import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { MealType } from "../../../../types/MealType";
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
import InputNumber from "../../input/InputNumber";
import InputSelect from "../../input/InputSelect";
import InputTextArea from "../../input/InputTextArea";
import { Switch } from "../../input/Switch";
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
  const [order, setOrder] = useState<any>();
  const [orderItems, setOrderItems] = useState<OrderItemsType[]>([]);
  const [meals, setMeals] = useState<MealType[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>();
  const [selectedTable, setSelectedTable] = useState<any>();
  const [pending, setPending] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(OrdersSchema()),
  });

  const columns: any = [
    {
      name: "Quantidade",
      selector: (row: any) => row.quantity,
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

  const data = order?.orderItems.map((item: OrderItemsType) => {
    return {
      quantity: item.quantity,
      meal: item?.meal?.name ?? "",
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
    setOrderItems(order.orderItems);
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

  const getMeals = async () => {
    await api.get(`meals`).then(({ data }: any) => {
      setMeals(data);
    });
  };

  const getOrder = async (id: string) => {
    await api
      .get(`orders/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setOrder(data);
          setOrderItems(data.orderItems ?? []);

          setSelectedClient({ value: data.client.id, label: data.client.name });
          setSelectedTable({
            value: data.table.id,
            label: data.table.number,
          });
          setValue("clientId", data.client.id ?? "");
          setValue("tableId", data.table.id ?? "");
          setValue("date", data.date ? FormatDateTime(data.date) : "");
          setValue("totalValue", data.total_value ?? "");
          setValue("paidValue", data.paid_value ?? "");
          setValue("orderItems", data.orderItems ?? []);
        }
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
      });
  };

  const updatePriceByQuantity = (e: any) => {
    const quantity = e.target.value;
    const currentMeal: MealType | undefined = meals.find(
      (meal: MealType) => meal.id == getValues("mealId")
    );

    if (currentMeal)
      (document.getElementById("price") as any).value = (
        +currentMeal.price * quantity
      ).toFixed(2);
  };

  const updatePriceByMeal = (e: any) => {
    const quantity = getValues("quantity");
    const currentMeal: MealType = meals.filter(
      (meal: MealType) => meal.id == getValues("mealId")
    )[0];

    (document.getElementById("price") as any).value = (
      +currentMeal.price * quantity
    ).toFixed(2);
  };

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
    getMeals();
    setPending(false);
  }, []);

  return (
    <>
      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-screen flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`max-h-[80vh] w-[90vw]`}>
          <BodyCard title={`${id ? "Editar" : "Cadastrar"} Pedido`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <input
                      type="hidden"
                      value={order?.orderItems}
                      {...register("orderItems")}
                    />

                    <div className="p-2 sm:col-span-3 col-span-12">
                      <InputSelect
                        register={register("client")}
                        id={`clientId`}
                        name={"clientId"}
                        placeholder={"Selecione um cliente..."}
                        label={"Cliente"}
                        options={clients}
                        setValue={setValue}
                        value={selectedClient}
                        onChange={(e: SelectType) => setSelectedClient(e)}
                      />
                    </div>
                    <div className="p-2 sm:col-span-2 col-span-12">
                      <InputSelect
                        register={register("tableId")}
                        id={`tableId`}
                        name={"tableId"}
                        placeholder={"Selecione uma Mesa..."}
                        label={"Mesa"}
                        options={tables}
                        setValue={setValue}
                        value={selectedTable}
                        onChange={(e: SelectType) => setSelectedTable(e)}
                      />
                    </div>

                    <div className="pt-2.5 p-2 sm:col-span-2 col-span-12">
                      <InputDateTime
                        register={register("date")}
                        id={`date`}
                        name={"date"}
                        label={"Data"}
                        setValue={setValue}
                      />
                    </div>

                    <div className="p-2 sm:col-span-2 col-span-12">
                      <InputNumber
                        register={register("totalValue")}
                        id={`totalValue`}
                        name={"totalValue"}
                        placeholder={""}
                        label={"Valor Total"}
                        min={0.01}
                        max={999999.99}
                        step={0.01}
                        errorMessage={errors?.totalValue?.message}
                      />
                    </div>
                    <div className="p-2 sm:col-span-2 col-span-12">
                      <InputNumber
                        register={register("paidValue")}
                        id={`paidValue`}
                        name={"paidValue"}
                        placeholder={""}
                        label={"Valor Pago"}
                        min={0.0}
                        max={999999.99}
                        step={0.01}
                        errorMessage={errors?.paidValue?.message}
                      />
                    </div>
                    <div className="p-2 md:col-span-1 sm:col-span-2 col-span-12">
                      <Switch
                        register={register("isClosed")}
                        id={"isClosed"}
                        name={"isClosed"}
                        label={"Fechado"}
                        setValue={setValue}
                        top
                        defaultValue={getValues().isClosed as boolean}
                      />
                    </div>
                    <div className="p-2 col-span-12">
                      <BodyCard title={`Itens do Pedido`}>
                        <div className={`grid grid-cols-12`}>
                          <div className="p-2 sm:col-span-4 col-span-12">
                            <InputSelect
                              register={register("mealId")}
                              id={`mealId`}
                              name={"mealId"}
                              placeholder={"Selecione uma Refeição..."}
                              label={"Refeição"}
                              options={meals.map((meal: MealType) => {
                                return {
                                  value: meal.id,
                                  label: meal.name,
                                };
                              })}
                              onChange={(e: any) => {
                                updatePriceByMeal(e);
                              }}
                              setValue={setValue}
                            />
                          </div>
                          <div className="p-2 sm:col-span-2 col-span-12">
                            <InputNumber
                              register={register("quantity")}
                              id={`quantity`}
                              name={"quantity"}
                              placeholder={""}
                              label={"Quantidade"}
                              min={0.01}
                              max={999999.99}
                              step={0.01}
                              onChange={(e: any) => {
                                updatePriceByQuantity(e);
                              }}
                              errorMessage={errors?.totalValue?.message}
                            />
                          </div>
                          <div className="p-2 sm:col-span-2 col-span-12">
                            <InputNumber
                              register={register("price")}
                              id={`price`}
                              name={"price"}
                              placeholder={""}
                              label={"Preço"}
                              min={0.01}
                              max={999999.99}
                              step={0.01}
                              readOnly
                            />
                          </div>
                          <div className="p-2 sm:col-span-4 col-span-12">
                            <InputTextArea
                              register={register("observation")}
                              id={`observation`}
                              name={"observation"}
                              placeholder={"Digite uma observação..."}
                              label={"Observação (opcional)"}
                            />
                          </div>
                          <div className="md:col-span-10 col-span-2"></div>
                          <div className="pt-7 p-2 items-end md:col-span-2 col-span-10">
                            <ButtonSolid
                              id={"add"}
                              label={"Adicionar"}
                              color={"primary"}
                              onClick={() => {
                                const quantity = getValues("quantity");
                                const mealId = getValues("mealId");
                                const observation = getValues("observation");
                                const price = (
                                  document.getElementById("price") as any
                                ).value;
                                // console.log(
                                //   quantity,
                                //   mealId,
                                //   observation,
                                //   price
                                // );
                                setOrder({
                                  ...order,
                                  orderItems: [
                                    ...order.orderItems,
                                    {
                                      id: "0",
                                      meal_id: mealId,
                                      meal: meals.find(
                                        (meal: MealType) => meal.id == mealId
                                      ),
                                      quantity: quantity,
                                      observation: observation,
                                      price: price,
                                      order_id: id ?? "0",
                                    },
                                  ],
                                });
                              }}
                            />
                          </div>
                        </div>

                        <div className={`col-span-12 py-4`}>
                          <SimpleTable
                            columns={columns}
                            data={data}
                            pending={pending}
                          />
                        </div>
                      </BodyCard>
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
