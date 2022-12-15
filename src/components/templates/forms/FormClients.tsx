import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SelectType } from "../../../../types/SelectType";
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

type Props = {
  id?: string;
  setModal: Function;
  handleClear: Function;
};

export const FormClients = ({ id, handleClear, setModal }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [client, setClient] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(ClientsSchema()),
  });

  const handleSave = (data: any) => {
    setIsLoading(true);
    if (id) {
      api
        .put(`clients/${id}`, { ...data, cpf: SanitizeCpf(data.cpf) })
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
        .post(`clients`, { ...data, cpf: SanitizeCpf(data.cpf) })
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

  const getClient = async (id: string) => {
    await api
      .get(`clients/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setClient(data);

          setValue("name", data.name ?? "");
          setValue("cpf", data.cpf ?? "");
        }
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
      });
  };

  useEffect(() => {
    if (id) {
      getClient(id);
    }
  }, []);

  return (
    <>
      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-screen flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`max-h-[80vh] max-w-[80vw]`}>
          <BodyCard title={`${id ? "Editar" : "Cadastrar"} Cliente`}>
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
                    <div className="p-2 md:col-span-5 sm:col-span-6 col-span-12">
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
      </div>
    </>
  );
};