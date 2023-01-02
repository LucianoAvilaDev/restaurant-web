import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { v4 } from "uuid";
import { OrdersSchema } from "../../../schemas/OrdersSchema";
import { api } from "../../../services/api";
import { MealType } from "../../../types/MealType";
import { OrderItemsType } from "../../../types/OrderItemType";
import { OrderType } from "../../../types/OrderType";
import { SelectType } from "../../../types/SelectType";
import { TableType } from "../../../types/TableType";
import { FormatMoney } from "../../../utils/FormatMoney";
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
import { FormOrderItems } from "./FormOrderItems";

type Props = {
  id?: string;
  table?: TableType;
  setModal: Function;
  handleClear: Function;
  clients: SelectType[];
};

export const FormOrders = ({
  id,
  table,
  clients,
  handleClear,
  setModal,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderType>({} as OrderType);
  const [originalOrderItemsIds, setOriginalOrderItemsIds] = useState<string[]>(
    []
  );
  const [meals, setMeals] = useState<MealType[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>();
  const [selectedTable, setSelectedTable] = useState<any>();
  const [pending, setPending] = useState<boolean>(false);
  const [animation, setAnimation] = useState<string>("animate-showIn");

  const [tables, setTables] = useState<any>([]);

  const [subModal, setSubModal] = useState<boolean>(true);
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);

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

      allowOverflow: true,
    },
    {
      name: "Refeição",
      selector: (row: any) => row.meal,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Preço",
      selector: (row: any) => row.price,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Observação",
      selector: (row: any) => row.observation,
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

  const data = order
    ? order.orderItems?.map((item: OrderItemsType) => {
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
                  id={item.id}
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
                        <FormOrderItems
                          meals={meals}
                          item={item}
                          parentSetValue={setValue}
                          order={order}
                          setOrder={setOrder}
                          handleClear={handleClear}
                          setModal={setSubModal}
                          updatePriceByMeal={updatePriceByMeal}
                          updatePriceByQuantity={updatePriceByQuantity}
                        />
                      )
                    ).then(() => {
                      setSubModal(true);
                    });
                  }}
                />
              </div>
              <div>
                <TableButtonSolid
                  id={order.id}
                  tooltip={`Excluir`}
                  icon={
                    <BiTrash
                      size={18}
                      className={`filter hover:drop-shadow m-1`}
                    />
                  }
                  color={"danger"}
                  onClick={() => {
                    InfoAlert(
                      <YesNoTemplate
                        onClickYes={() => handleModalYes(item.id, item.meal.id)}
                      />
                    );
                  }}
                />
              </div>
            </div>
          ),
        };
      })
    : [];

  const getAvailableTables = async () => {
    api.get("available-tables").then(({ data }: any) => {
      setTables(
        data.map((table: TableType) => {
          return {
            value: table.id,
            label: table.number,
          };
        })
      );
    });
  };

  const handleModalYes = (id: string, mealId: string) => {
    const newItems = order.orderItems.filter(
      (item: OrderItemsType) => item.id !== id || item.meal_id !== mealId
    );
    setOrder({ ...order, orderItems: newItems });
    setValue("orderItems", newItems);

    let newTotal: number = 0.0;

    newItems.forEach((item: any) => {
      newTotal += parseFloat(item.price);
    });

    setValue("totalValue", newTotal);
  };

  const saveOrderItems = async (orderId: string, orderItems: any[]) => {
    try {
      orderItems
        .filter((item: any) => item.id == "0")
        .forEach((item: any) => {
          api.post("order-items", {
            observation: item.observation,
            quantity: item.quantity,
            price: item.price,
            mealId: item.meal_id,
            orderId: orderId,
          });
          return item.id;
        });

      const editedItemsIds: any = orderItems
        .filter((item: any) => item.id != "0")
        .map((item: any) => {
          api.put(`order-items/${item.id}`, {
            observation: item.observation,
            quantity: item.quantity,
            price: item.price,
            mealId: item.meal_id,
            orderId: orderId,
          });
          return item.id;
        });

      // DIFERNÇA DO ORDERITEMS(VALOR ORIGINAL) E O EDIT(VALOR ALTERADO)

      originalOrderItemsIds
        .filter((id: string) => !editedItemsIds.includes(id))
        .forEach((item: string) => {
          api.delete(`order-items/${item}`);
        });
    } catch (e: any) {
      ErrorAlert(e.message);
      setIsLoading(false);
    }
  };

  const handleSave = (data: any) => {
    if (!data.orderItems || data.orderItems.length == 0) {
      ErrorAlert("Adicione no mínimo UM item ao pedido!");
      return;
    }

    const orderItemsToSave: any = data.orderItems;

    const saveOrder: any = {
      date: data.date,
      totalValue: data.totalValue,
      paidValue: data.paidValue,
      clientId: data.clientId,
      tableId: data.tableId,
      isClosed: data.isClosed,
    };
    setIsLoading(true);

    if (id) {
      api
        .put(`orders/${id}`, saveOrder)
        .then(async () => {
          await saveOrderItems(id, orderItemsToSave);

          SuccessAlert("Registro salvo com sucesso!");
          setIsLoading(false);
          setModal(false);

          await handleClear();
          return;
        })
        .catch(({ response }: AxiosError) => {
          ErrorAlert(
            (response?.data as string) ??
              "Houve um erro! Tente novamente mais tarde."
          );
          setIsLoading(false);
          setIsLoading(false);
          return;
        });
    } else {
      api
        .post(`orders`, saveOrder)
        .then(async ({ data }: any) => {
          await saveOrderItems(data.id, orderItemsToSave);

          SuccessAlert("Registro salvo com sucesso!");
          setIsLoading(false);
          setModal(false);
          await handleClear();
          return;
        })
        .catch(({ response }: AxiosError) => {
          ErrorAlert(
            (response?.data as string) ??
              "Houve um erro! Tente novamente mais tarde."
          );
          setIsLoading(false);
          setIsLoading(false);
          return;
        });
    }
  };

  const handleCancel = () => {
    setAnimation("animate-showOut");
    setTimeout(() => setModal(false), 150);
  };

  const getMeals = async () => {
    await api.get(`meals`).then(({ data }: any) => {
      setMeals(data);
    });
  };

  const handleAddItem = async () => {
    setIsLoading(true);
    const quantity = getValues("quantity");
    const mealId = getValues("mealId");
    const observation = getValues("observation");
    const price = (document.getElementById("price") as any).value;

    let repeated: boolean = false;

    order?.orderItems?.forEach((item: any) => {
      if (item.meal_id == mealId) {
        repeated = true;
      }
    });

    if (repeated) {
      ErrorAlert("Refeição já adicionada ao pedido!");
      setIsLoading(false);
      return;
    }

    const newItem: any = {
      id: "0",
      key: v4(),
      meal_id: mealId,
      meal: meals.find((meal: MealType) => meal.id == mealId),
      quantity: quantity,
      observation: observation,
      price: price,
      order_id: id ?? "0",
    };

    setValue(
      "totalValue",
      parseFloat(getValues().totalValue) + parseFloat(price)
    );

    if (order.orderItems) {
      setOrder({
        ...order,
        orderItems: [...order.orderItems, newItem],
      });
      setValue("orderItems", [...order?.orderItems, newItem]);

      setIsLoading(false);
      return;
    }

    setOrder({
      ...order,
      orderItems: [newItem],
    });
    setValue("orderItems", [newItem]);
    setIsLoading(false);
    return;
  };

  const getOrder = async (id?: string) => {
    if (id) {
      await api
        .get(`orders/${id}`)
        .then(({ data }: any) => {
          if (data) {
            setOrder({
              ...data,
              orderItems: data.orderItems.map((item: any) => {
                return { ...item, key: v4() };
              }),
            });
            setTables([
              ...tables,
              {
                value: data.table.id,
                label: data.table.number,
              },
            ]);
            setOriginalOrderItemsIds(
              data.orderItems ? data.orderItems.map((item: any) => item.id) : []
            );

            setSelectedClient({
              value: data.client.id,
              label: data.client.name,
            });
            setSelectedTable({
              value: data.table.id,
              label: data.table.number,
            });
            setValue("clientId", data.client.id ?? "");
            setValue("tableId", data.table.id);
            setValue("date", moment(data.date).format("YYYY-MM-DDTHH:mm"));
            setValue("totalValue", data.total_value);
            setValue("paidValue", data.paid_value ?? 0);
            setValue("isClosed", data.is_closed ?? false);
            setValue("orderItems", data.orderItems ?? []);
          }
        })
        .catch(({ response }: AxiosError) => {
          ErrorAlert(
            (response?.data as string) ??
              "Houve um erro! Tente novamente mais tarde."
          );
        });
    } else {
      setValue("date", moment().format("YYYY-MM-DDTHH:mm"));
      setValue("tableId", table?.id ?? "");
      setValue("totalValue", 0.0);
      setValue("paidValue", 0.0);

      if (table)
        setSelectedTable({
          value: table.id,
          label: table.number,
        });
    }
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
    getAvailableTables();
    getOrder(id);
    getMeals();
    setPending(false);
  }, []);

  return (
    <>
      {subModal && modalTemplate}
      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-full flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`${animation} max-h-[90vh] w-[100vw] md:w-[80vw]`}>
          <BodyCard title={`${id ? "Editar" : "Cadastrar"} Pedido`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <div className="lg:col-span-6 md:col-span-4 sm:col-span-6 col-span-12 z-20 p-2 ">
                      <InputSelect
                        register={register("clientId")}
                        id={`clientId`}
                        name={"clientId"}
                        placeholder={"Selecione um cliente..."}
                        label={"Cliente"}
                        options={clients}
                        setValue={setValue}
                        value={selectedClient}
                        onChange={(e: SelectType) => setSelectedClient(e)}
                        errorMessage={errors?.clientId?.message}
                      />
                    </div>
                    <div className="z-20 p-2 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
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
                        errorMessage={errors?.tableId?.message}
                      />
                    </div>

                    <div className="p-2 flex justify-center items-center lg:col-span-2 md:col-span-3 sm:col-span-6 col-span-12">
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
                    <div className="p-2 lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputDateTime
                        register={register("date")}
                        id={`date`}
                        name={"date"}
                        label={"Data"}
                        setValue={setValue}
                      />
                    </div>
                    <div className="p-2 lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
                      <InputNumber
                        register={register("totalValue")}
                        id={`totalValue`}
                        name={"totalValue"}
                        placeholder={""}
                        label={"Valor Total"}
                        min={0.0}
                        max={999999.99}
                        step={0.01}
                        readOnly
                        errorMessage={errors?.totalValue?.message}
                      />
                    </div>
                    <div className="p-2 lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-12">
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

                    <div className="pt-8 p-2 pb-4  items-end md:col-span-2 sm:col-span-6  col-span-10">
                      <ButtonSolid
                        id={"add"}
                        label={"Pagar"}
                        color={"primary"}
                        onClick={() => {
                          (document.getElementById("paidValue") as any).value =
                            (
                              document.getElementById("totalValue") as any
                            ).value;

                          (document.getElementById("isClosed") as any).click();
                        }}
                      />
                    </div>
                    <div className="border-t col-span-12 ">
                      <div className={`px-2 font-medium text-xl py-4 `}>
                        Itens do Pedido
                      </div>

                      <div className={`grid grid-cols-12`}>
                        <div className="p-2 sm:col-span-6 col-span-12">
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
                        <div className="p-2 sm:col-span-3 col-span-12">
                          <InputNumber
                            register={register("quantity")}
                            id={`quantity`}
                            name={"quantity"}
                            placeholder={""}
                            label={"Quantidade"}
                            min={1}
                            max={999999.99}
                            step={1}
                            onChange={(e: any) => {
                              updatePriceByQuantity(e);
                            }}
                          />
                        </div>
                        <div className="p-2 sm:col-span-3 col-span-12">
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
                        <div className="p-2 sm:col-span-10 col-span-12">
                          <InputTextArea
                            register={register("observation")}
                            id={`observation`}
                            name={"observation"}
                            placeholder={"Digite uma observação..."}
                            label={"Observação (opcional)"}
                          />
                        </div>
                        <div className="pt-7 p-2 items-end md:col-span-2 col-span-10">
                          <ButtonSolid
                            id={"add"}
                            label={"Adicionar"}
                            color={"primary"}
                            onClick={handleAddItem}
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
