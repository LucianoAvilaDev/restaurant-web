import { GetServerSideProps } from "next";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { MealType } from "../../../types/MealType";
import { BodyCard } from "../../components/cards/BodyCard";
import { ButtonSolid } from "../../components/input/ButtonSolid";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";
import { TableButtonSolid } from "../../components/tables/TabbleButtonSolid";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";

type Props = {
  meals: MealType[];
};

const index = () => {
  const [meals, setMeals] = useState<MealType[]>([]);

  const getMeals = async () => {
    await api.get("meals").then(({ data }: any) => {
      setMeals(data);
    });
  };

  useEffect(() => {
    getMeals();
  }, []);

  const router: NextRouter = useRouter();

  const columns: any = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
    },
    {
      name: "Preço",
      selector: (row: any) => row.price,
    },
    {
      name: "Tipo",
      selector: (row: any) => row.type,
    },
    {
      name: "Ações",
      selector: (row: any) => row.actions,
    },
  ];
  const data: any[] = meals.map((meal) => {
    return {
      name: meal.name,
      price: meal.price,
      type: meal.mealType.name,
      actions: (
        <div className={`flex`}>
          <div className={`p-1`}>
            <TableButtonSolid
              id={meal.id}
              tooltip={`Editar`}
              icon={<MdOutlineModeEditOutline size={18} />}
              color={"success"}
            />
          </div>
          <div className={`p-1`}>
            <TableButtonSolid
              id={meal.id}
              tooltip={`Excluir`}
              icon={<BiTrash size={18} />}
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
        label={"Nova"}
        color={"primary"}
        onClick={() => {
          router.push("meals/create");
        }}
      />
    </div>
  );

  return (
    <Navigation>
      <div className={`px-3 w-full`}>
        <BodyCard title={`Refeições`} newButton={newButton}>
          <div className="px-2 py-4">
            <SimpleTable columns={columns} data={data} />
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
