import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { TableButtonSolid } from "../../components/buttons/TableButtonSolid";
import { BodyCard } from "../../components/cards/BodyCard";
import InputText from "../../components/input/InputText";
import InputTextMasked from "../../components/input/InputTextMasked";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";
import { FormClients } from "../../components/templates/forms/FormClients";
import YesNoTemplate from "../../components/templates/YesNoTemplate";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";
import { ClientType } from "../../types/ClientType";
import { FormatCpf } from "../../utils/FormatCpf";
import { SanitizeCpf } from "../../utils/SanitizeCpf";

type Props = {
  loadedClients: ClientType[];
};

const Index = ({ loadedClients }: Props) => {
  const { user, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.permissions.includes("manage_clients"))
      Router.push("../dashboard");
  }, []);

  const { register, handleSubmit, setValue } = useForm();

  const [clients, setClients] = useState<ClientType[]>(loadedClients);
  const [pending, setPending] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);

  const columns: any = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "CPF",
      selector: (row: any) => row.cpf,
      sortable: true,
      center: true,

      allowOverflow: true,
    },

    {
      name: "Ações",
      selector: (row: any) => row.actions,
      center: true,

      allowOverflow: true,
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

  const getClients = async () => {
    setPending(true);
    await api.get("clients").then(({ data }: any) => {
      setClients(data);
      setPending(false);
    });
  };

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
      .catch(({ response }: AxiosError) => {
        ErrorAlert(
          (response?.data as string) ??
            "Houve um erro! Tente novamente mais tarde."
        );
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

  return (
    <>
      {modal && modalTemplate}
      <Navigation>
        <div className={`px-3 w-full min-h-screen`}>
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

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const apiClient = getApiClient(ctx);

  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "login",
        permanent: false,
      },
    };
  }

  const clients: ClientType[] = await apiClient
    .get("clients")
    .then(({ data }: any) => data);

  return {
    props: { loadedClients: clients },
  };
};
