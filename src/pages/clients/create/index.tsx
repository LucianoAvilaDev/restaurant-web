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
import InputTextMasked from "../../../components/input/InputTextMasked";
import Loader from "../../../components/loader/Loader";
import Navigation from "../../../components/navigation/Navigation";
import { ClientsSchema } from "../../../schemas/ClientsSchema";
import { api } from "../../../services/api";
import validateAuth from "../../../services/validateAuth";
import { SanitizeCpf } from "../../../utils/SanitizeCpf";

const index = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ClientsSchema()),
  });

  const handleSave = (data: any) => {
    setIsLoading(true);
    api
      .post(`clients`, { ...data, cpf: SanitizeCpf(data.cpf) })
      .then(() => {
        SuccessAlert("Registro salvo com sucesso!");
        router.push("../clients");
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
        setIsLoading(false);
      });
  };

  const handleCancel = () => {
    setIsLoading(true);
    router.push("../clients");
  };

  return (
    <>
      {isLoading && <Loader />}
      <Navigation>
        <div className={`px-3 w-full`}>
          <BodyCard title={`Cadastrar Cliente`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <div className="p-2 md:col-span-5 sm:col-span-6 col-span-12">
                      <InputText
                        register={register("name")}
                        id={`name`}
                        name={"name"}
                        placeholder={"Digite o nome..."}
                        label={"Nome"}
                        errorMessage={errors?.name?.message}
                      />
                    </div>
                    <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputTextMasked
                        register={register("cpf")}
                        id={"cpf"}
                        name={"cpf"}
                        placeholder={"Digite o CPF..."}
                        label={"CPF"}
                        mask={"000.000.000-00"}
                        errorMessage={errors?.cpf?.message}
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
        destination: "../login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
