import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { OrderItemsSchema } from "../../../schemas/OrderItemsSchema";
import { MealType } from "../../../types/MealType";
import { OrderItemsType } from "../../../types/OrderItemType";
import { ErrorAlert } from "../../alerts/ErrorAlert";
import { ButtonSolid } from "../../buttons/ButtonSolid";
import { BodyCard } from "../../cards/BodyCard";
import InputNumber from "../../input/InputNumber";
import InputSelect from "../../input/InputSelect";
import InputTextArea from "../../input/InputTextArea";
import Loader from "../../loader/Loader";

type Props = {
  item: any;
  setModal: Function;
  handleClear: Function;
  setOrder: Function;
  parentSetValue: Function;
  order: any;
  meals: any;
  updatePriceByMeal: Function;
  updatePriceByQuantity: Function;
};

export const FormOrderItems = ({
  item,
  meals,
  setModal,
  setOrder,
  parentSetValue,
  order,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderItem, setOrderItem] = useState<OrderItemsType>(item);
  const [mealId, setMealId] = useState<any>({
    value: item.meal.id,
    label: item.meal.name,
  });
  const [originalMealId, setOriginalMealId] = useState<string>(item.meal.id);
  const [animation, setAnimation] = useState<string>("animate-showIn");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(OrderItemsSchema()),
  });

  const handleSave = (data: any) => {
    const itemsWithoutEdited = order.orderItems.filter(
      (currentItem: any) =>
        currentItem.id !== item.id && currentItem.meal.id !== originalMealId
    );

    let repeated: boolean = false;

    itemsWithoutEdited.forEach((currentItem: any) => {
      if (currentItem.meal.id == data.mealId) repeated = true;
    });

    if (repeated) {
      ErrorAlert("Refeição já adicionada!");
      return;
    }

    const editedItem: any = {
      id: item.id,
      meal_id: data.mealId,
      meal: meals.find((meal: MealType) => meal.id == data.mealId),
      quantity: data.quantity,
      observation: data.observation,
      price: data.price,
    };

    const allOrderItems: any[] = [...itemsWithoutEdited, editedItem];

    let newTotal: number = 0.0;

    allOrderItems.forEach((item: any) => {
      newTotal += parseFloat(item.price);
    });

    setIsLoading(true);
    setOrder({
      ...order,
      orderItems: [...itemsWithoutEdited, editedItem],
      total_value: newTotal,
    });
    parentSetValue("orderItems", [...itemsWithoutEdited, editedItem]);
    parentSetValue("totalValue", newTotal);
    setModal(false);
  };

  const handleCancel = () => {
    setAnimation("animate-showOut");
    setTimeout(() => setModal(false), 150);
  };

  const getOrderItem = async () => {
    setOrderItem(item);

    setValue("mealId", item.meal.id);
    setValue("quantity", item.quantity);
    setValue("price", item.price);
    setValue("observation", item.observation);
  };

  useEffect(() => {
    getOrderItem();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className={`fixed z-50 bg-black/50 scrollbar w-full min-h-full flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`${animation} max-h-screen w-[100vw] md:w-[80vw]`}>
          <BodyCard title={`Editar Item de Pedido`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <div className="p-2 md:col-span-6 sm:col-span-6 col-span-12">
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
                          const quantity = getValues("quantity");
                          const currentMeal: MealType = meals.filter(
                            (meal: MealType) => meal.id == getValues("mealId")
                          )[0];

                          (document.getElementById("price") as any).value = (
                            +currentMeal.price * quantity
                          ).toFixed(2);

                          setValue("price", +currentMeal.price * quantity);
                          setMealId({
                            value: currentMeal.id,
                            label: currentMeal.name,
                          });
                        }}
                        setValue={setValue}
                        value={mealId}
                      />
                    </div>
                    <div className="p-2 md:col-span-3 sm:col-span-6 col-span-12">
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
                          const quantity = e.target.value;
                          const currentMeal: MealType | undefined = meals.find(
                            (meal: MealType) => meal.id == getValues("mealId")
                          );

                          if (currentMeal) {
                            (document.getElementById("price") as any).value = (
                              +currentMeal.price * quantity
                            ).toFixed(2);

                            setValue("price", +currentMeal.price * quantity);
                          }
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
                    <div className="p-2 col-span-12">
                      <InputTextArea
                        register={register("observation")}
                        id={`observation`}
                        name={"observation"}
                        placeholder={"Digite uma observação..."}
                        label={"Observação (opcional)"}
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
