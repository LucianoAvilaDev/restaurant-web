import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorAlert } from "../../../components/alerts/ErrorAlert";
import { SuccessAlert } from "../../../components/alerts/SuccessAlert";
import { ButtonSolid } from "../../../components/buttons/ButtonSolid";
import { BodyCard } from "../../../components/cards/BodyCard";
import InputText from "../../../components/input/InputText";
import { Switch } from "../../../components/input/Switch";
import Loader from "../../../components/loader/Loader";
import Navigation from "../../../components/navigation/Navigation";
import { MealsSchema } from "../../../schemas/MealsSchema";
import { TablesSchema } from "../../../schemas/TablesSchema";
import { api } from "../../../services/api";
import { getApiClient } from "../../../services/getApiClient";
import validateAuth from "../../../services/validateAuth";

const index = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TablesSchema()),
  });

  const handleSave = (data: any) => {
    setIsLoading(true);
    api
      .post(`tables`, data)
      .then(() => {
        SuccessAlert("Registro salvo com sucesso!");
        router.push("../tables");
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    setIsLoading(true);
    router.push("../tables");
  };

  return (
    <>
      {isLoading && <Loader />}
      <Navigation>
        <div className={`px-3 w-full`}>
          <BodyCard title={`Cadastrar Mesa`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputText
                        register={register("number")}
                        id={`number`}
                        name={"number"}
                        placeholder={"Digite o número..."}
                        label={"Número"}
                        errorMessage={errors?.name?.message}
                      />
                    </div>
                    <div className="p-2 md:col-span-4 sm:col-span-3 col-span-12">
                      <Switch
                        register={register("isAvailable")}
                        id={"isAvailable"}
                        name={"isAvailable"}
                        label={"Disponível"}
                        top
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
  const apiClient = getApiClient(ctx);

  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "../login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
