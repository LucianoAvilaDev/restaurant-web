import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";
import { SelectType } from "../../../../types/SelectType";
import { ButtonSolid } from "../../../components/buttons/ButtonSolid";
import { BodyCard } from "../../../components/cards/BodyCard";
import InputNumber from "../../../components/input/InputNumber";
import InputSelect from "../../../components/input/InputSelect";
import InputText from "../../../components/input/InputText";
import InputTextArea from "../../../components/input/InputTextArea";
import Loader from "../../../components/loader/Loader";
import Navigation from "../../../components/navigation/Navigation";
import { MealsSchema } from "../../../schemas/MealsSchema";
import { api } from "../../../services/api";
import validateAuth from "../../../services/validateAuth";

type Props = {
  id: string;
};

const index = ({ id }: Props) => {
  const [meal, setMeal] = useState<any>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [mealTypes, setMealTypes] = useState<SelectType[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(MealsSchema()),
  });

  const getMeal = async (id: string) => {
    await api
      .get(`meals/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setMeal(data);

          setValue("name", data.name);
          setValue("price", data.price);
          setValue("mealTypeId", data.mealType.id);
          setValue("description", data.description);
        }
      })
      .catch((e: any) => {
        router.push("meals");
      });
  };

  const getMealTypes = async () => {
    await api.get("meal-types").then(({ data }: any) => {
      setMealTypes(
        data.map((mealType: any) => {
          return { value: mealType.id, label: mealType.name };
        })
      );
    });
  };

  const handleSave = (data: any) => {
    setIsLoading(true);
    api
      .put(`meals/${id}`, data)
      .then(() => {
        router.push("../../meals");
      })
      .catch((e: any) => {
        alert("Erro ao salvar");
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    setIsLoading(true);
    router.push("../../meals");
  };

  useEffect(() => {
    getMealTypes();
    getMeal(id);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Navigation>
        <div className={`px-3 w-full`}>
          <BodyCard title={`Editar Refeição`}>
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
      </Navigation>
    </>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "../../login",
        permanent: false,
      },
    };
  }

  const id: string = ctx.params.id;

  if (!id || isNaN(+id)) {
    return {
      redirect: {
        destination: "../../meals",
        permanent: false,
      },
    };
  }

  return {
    props: {
      id: id,
    },
  };
};
