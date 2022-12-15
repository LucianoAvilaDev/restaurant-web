import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SelectType } from "../../../types/SelectType";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { BodyCard } from "../../components/cards/BodyCard";
import InputNumber from "../../components/input/InputNumber";
import InputSelect from "../../components/input/InputSelect";
import InputText from "../../components/input/InputText";
import InputTextArea from "../../components/input/InputTextArea";
import { MealsSchema } from "../../schemas/MealsSchema";
import { api } from "../../services/api";

type Props = {
  id?: string;
  setModal: Function;
  getMeals: Function;
  mealTypes: SelectType[];
};

export const FormMeals = ({ id, setModal, mealTypes, getMeals }: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [meal, setMeal] = useState<any>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(MealsSchema()),
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
          await getMeals();
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
        .post(`meals`, data)
        .then(async () => {
          SuccessAlert("Registro salvo com sucesso!");
          setIsLoading(false);
          setModal(false);
          await getMeals();
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

  const getMeal = async (id: string) => {
    await api
      .get(`meals/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setMeal(data);

          setValue("name", data.name ?? "");
          setValue("price", data.price ?? "");
          setValue("mealTypeId", data.mealType.id ?? "");
          setValue("description", data.description ?? "");
        }
      })
      .catch((e: any) => {
        router.push("meals");
      });
  };

  useEffect(() => {
    if (id) {
      getMeal(id);
    }
  }, []);

  return (
    <>
      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-screen flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`max-h-[80vh] max-w-[80vw]`}>
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
