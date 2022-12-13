import { GetServerSideProps } from "next";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { MealType } from "../../../types/MealType";
import { BodyCard } from "../../components/cards/BodyCard";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";
import { TableButtonSolid } from "../../components/buttons/TabbleButtonSolid";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import InputText from "../../components/input/InputText";
import { useForm } from "react-hook-form";
import InputSelect from "../../components/input/InputSelect";

type Props = {
  mealsList: MealType[];
};

const index = () => {
  const [meals, setMeals] = useState<MealType[]>([]);
  const [mealTypes, setMealTypes] = useState<
    { value: string; label: string }[]
  >([]);
  const [pending, setPending] = useState<boolean>(true);

  const getMeals = async (filters?: string) => {
    setPending(true);
    await api.get("meals").then(({ data }: any) => {
      setMeals(data);
      setPending(false);
    });
  };

  const getMealTypes = async () => {
    await api.get("meal-types").then(({ data }: any) => {
      setMealTypes(
        data.map((type: any) => {
          return { value: type.name, label: type.name };
        })
      );
    });
  };

  useEffect(() => {
    getMeals();
    getMealTypes();
  }, []);

  const router: NextRouter = useRouter();

  const columns: any = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
      sortable: true,
      center: true,
      width: "30%",
    },
    {
      name: "Preço",
      selector: (row: any) => row.price,
      sortable: true,
      center: true,
      width: "20%",
    },
    {
      name: "Tipo",
      selector: (row: any) => row.type,
      sortable: true,
      center: true,
      width: "30%",
    },
    {
      name: "Ações",
      selector: (row: any) => row.actions,
      center: true,
      width: "20%",
    },
  ];
  const data: any[] = meals.map((meal) => {
    return {
      name: meal.name,
      price: (+meal.price).toLocaleString(),
      type: meal.mealType.name,
      actions: (
        <div className={`flex space-x-2`}>
          <div className={`py-2`}>
            <TableButtonSolid
              id={meal.id}
              tooltip={`Editar`}
              icon={<MdOutlineModeEditOutline />}
              color={"success"}
              onClick={() => {
                router.push(`meals/edit/${meal.id}`);
              }}
            />
          </div>
          <div className={`py-2`}>
            <TableButtonSolid
              id={meal.id}
              tooltip={`Excluir`}
              icon={<BiTrash />}
              color={"danger"}
            />
          </div>
        </div>
      ),
    };
  });

  const newButton: JSX.Element = (
    <div className={`flex p-2`}>
      <ButtonSolid
        id={"newMeal"}
        label={"Cadastrar"}
        color={"primary"}
        onClick={() => {
          router.push("meals/create");
        }}
      />
    </div>
  );

  const { register, handleSubmit } = useForm();

  const handleSearch = (data: any) => {
    setPending(true);

    api.post("meals/filters", data).then(({ data }) => {
      setMeals(data);
      setPending(false);
    });
  };

  return (
    <Navigation>
      <div className={`px-3 w-full`}>
        <BodyCard title={`Refeições`} newButton={newButton}>
          <div className="px-2 pt-2 pb-6">
            <div className={`py-4`}>
              {/* --------------FILTERS ------------------------------ */}
              <form onSubmit={handleSubmit(handleSearch)}>
                <div className={`grid grid-cols-12 py-4`}>
                  <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                    <InputText
                      register={register("name")}
                      id={`name`}
                      name={"name"}
                      placeholder={"Pesquise pelo nome da refeição"}
                      label={"Nome"}
                    />
                  </div>
                  <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                    <InputSelect
                      register={register("type")}
                      id={`type`}
                      name={"type"}
                      placeholder={"Pesquise pelo tipo de refeição"}
                      label={"Tipo"}
                      options={mealTypes}
                    />
                  </div>
                </div>
                <div className={`flex w-full space-x-2 items-end justify-end`}>
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
                      onClick={() => {
                        const inputName = document.getElementById(
                          "name"
                        ) as any;
                        const inputValue = document.getElementById(
                          "type"
                        ) as any;

                        inputName.value = "";
                        inputValue.value = "";

                        return;
                      }}
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
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);

  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
