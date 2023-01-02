import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MealsSchema } from "../../../schemas/MealsSchema";
import { api } from "../../../services/api";
import { SelectType } from "../../../types/SelectType";
import { ErrorAlert } from "../../alerts/ErrorAlert";
import { SuccessAlert } from "../../alerts/SuccessAlert";
import { ButtonSolid } from "../../buttons/ButtonSolid";
import { BodyCard } from "../../cards/BodyCard";
import InputNumber from "../../input/InputNumber";
import InputSelect from "../../input/InputSelect";
import InputText from "../../input/InputText";
import InputTextArea from "../../input/InputTextArea";
import Loader from "../../loader/Loader";

type Props = {
  id?: string;
  setModal: Function;
  handleClear: Function;
  mealTypes: SelectType[];
};

export const FormMeals = ({ id, setModal, mealTypes, handleClear }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [meal, setMeal] = useState<any>();
  const [mealTypeId, setMealTypeId] = useState<any>();
  const [animation, setAnimation] = useState<string>("animate-showIn");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MealsSchema()),
    shouldUnregister: false,
  });

  const handleSave = (data: any) => {
    setIsLoading(true);
    if (id) {
      api
        .put(`meals/${id}`, data)
        .then(async () => {
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
        .post(`meals`, data)
        .then(async () => {
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

  const getMeal = async (id: string) => {
    await api
      .get(`meals/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setMeal(data);
          setMealTypeId({ value: data.mealType.id, label: data.mealType.name });

          setValue("name", data.name ?? "");
          setValue("price", data.price ?? "");
          setValue("mealTypeId", data.mealType.id ?? "");
          setValue("description", data.description ?? "");
        }
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
      });
  };

  useEffect(() => {
    if (id) {
      getMeal(id);
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-full flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`${animation} max-h-screen w-[100vw] md:w-[80vw]`}>
          <BodyCard title={`${id ? "Editar" : "Cadastrar"} Refeição`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputText
                        register={register("name")}
                        id={`name`}
                        name={"name"}
                        placeholder={"Digite o nome da refeição"}
                        label={"Nome"}
                        errorMessage={errors?.name?.message}
                        setValue={setValue}
                      />
                    </div>
                    <div className="p-2 md:col-span-4 sm:col-span-3 col-span-12">
                      <InputNumber
                        register={register("price")}
                        id={`price`}
                        name={"price"}
                        placeholder={"Digite o preço"}
                        label={"Preço"}
                        min={0.01}
                        max={999999.99}
                        step={0.01}
                        errorMessage={errors?.price?.message}
                      />
                    </div>
                    <div className="p-2 md:col-span-4 sm:col-span-3 col-span-12">
                      <InputSelect
                        register={register("mealTypeId")}
                        id={`mealTypeId`}
                        name={"mealTypeId"}
                        placeholder={"Selecione o tipo de refeição"}
                        label={"Tipo"}
                        options={mealTypes}
                        errorMessage={errors?.mealTypeId?.message}
                        setValue={setValue}
                        value={mealTypeId}
                        onChange={(e: any) => setMealTypeId(e)}
                      />
                    </div>
                    <div className="p-2 col-span-12">
                      <InputTextArea
                        register={register("description")}
                        id={`description`}
                        name={"description"}
                        placeholder={"Digite a descrição da refeição"}
                        label={"Descrição (Opcional)"}
                        errorMessage={errors?.description?.message}
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

export default FormMeals;
