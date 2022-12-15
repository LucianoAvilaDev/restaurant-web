import { GetServerSideProps } from "next";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { ClientType } from "../../../types/ClientType";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { TableButtonSolid } from "../../components/buttons/TabbleButtonSolid";
import { BodyCard } from "../../components/cards/BodyCard";
import InputText from "../../components/input/InputText";
import InputTextMasked from "../../components/input/InputTextMasked";
import Loader from "../../components/loader/Loader";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";
import { FormClients } from "../../components/templates/forms/FormClients";
import YesNoTemplate from "../../components/templates/YesNoTemplate";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";
import { FormatCpf } from "../../utils/FormatCpf";
import { SanitizeCpf } from "../../utils/SanitizeCpf";

const index = () => {
  const [clients, setClients] = useState<ClientType[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);

  const { register, handleSubmit, setValue } = useForm();

  const getClients = async () => {
    setPending(true);
    await api.get("clients").then(({ data }: any) => {
      setClients(data);
      setPending(false);
    });
  };

  const columns: any = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
      sortable: true,
      center: true,
      width: "50%",
    },
    {
      name: "CPF",
      selector: (row: any) => row.cpf,
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

  const data: any[] = clients.map((client: ClientType) => {
    return {
      name: client.name,
      cpf: FormatCpf(client.cpf),
      actions: (
        <div className={`flex flex-wrap`}>
          <div>
            <TableButtonSolid
              id={client.id}
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
                    <FormClients
                      id={client.id}
                      handleClear={handleClear}
                      setModal={setModal}
                    />
                  )
                ).then(() => {
                  setModal(true);
                });
              }}
            />
          </div>
          <div>
            <TableButtonSolid
              id={client.id}
              tooltip={`Excluir`}
              icon={
                <BiTrash size={18} className={`filter hover:drop-shadow m-1`} />
              }
              color={"danger"}
              onClick={() => {
                toast.info(
                  <YesNoTemplate
                    onClickYes={() => handleModalYes(client.id)}
                  />,
                  {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                  }
                );
              }}
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
        onClick={async () => {
          await Promise.resolve(
            setModalTemplate(
              <FormClients handleClear={handleClear} setModal={setModal} />
            )
          ).then(() => {
            setModal(true);
          });
        }}
      />
    </div>
  );

  const handleModalYes = async (id: string) => {
    setIsLoading(true);
    await api
      .delete(`clients/${id}`)
      .then(async () => {
        SuccessAlert("Registro excluído com sucesso");
        await getClients();
        setIsLoading(false);
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
        setIsLoading(false);
      });
  };

  const handleSearch = (data: any) => {
    setPending(true);

    api
      .post("clients/filters", {
        ...data,
        cpf: data.cpf ? SanitizeCpf(data.cpf) : "",
      })
      .then(({ data }) => {
        setClients(data);
        setPending(false);
      });
  };

  const handleClear = () => {
    setValue("name", "");
    setValue("cpf", "");

    (document.getElementById("search") as any).click();

    return;
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      {modal && modalTemplate}
      {isLoading && <Loader />}
      <Navigation>
        <div className={`px-3 w-full`}>
          <BodyCard title={`Clientes`} newButton={newButton}>
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
                        placeholder={"Pesquise pelo nome..."}
                        label={"Nome"}
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
                      />
                    </div>
                  </div>
                  <div
                    className={`flex w-full space-x-2 items-end justify-end`}
                  >
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
                        onClick={() => handleClear()}
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
    </>
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
