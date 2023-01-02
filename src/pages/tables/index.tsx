import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { InfoAlert } from "../../components/alerts/InfoAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import BadgeGreen from "../../components/badges/BadgeGreen";
import BadgeRed from "../../components/badges/BadgeRed";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { TableButtonSolid } from "../../components/buttons/TableButtonSolid";
import { BodyCard } from "../../components/cards/BodyCard";
import InputSelect from "../../components/input/InputSelect";
import InputText from "../../components/input/InputText";
import Loader from "../../components/loader/Loader";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";
import FormTables from "../../components/templates/forms/FormTables";
import YesNoTemplate from "../../components/templates/YesNoTemplate";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";
import { SelectType } from "../../types/SelectType";
import { TableType } from "../../types/TableType";

const Index = ({ loadedTables }: any) => {
  const [tables, setTables] = useState<TableType[]>(loadedTables);
  const [pending, setPending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);

  const { register, handleSubmit, setValue } = useForm();

  const getTables = async () => {
    setPending(true);
    await api.get("tables").then(({ data }: any) => {
      setTables(data);
      setPending(false);
    });
  };

  const columns: any = [
    {
      name: "Número",
      selector: (row: any) => row.number,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Situação",
      selector: (row: any) => row.isAvailable,
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

  const data: any[] = tables.map((table: TableType) => {
    return {
      number: table.number,
      isAvailable: table.is_available ? (
        <BadgeGreen text={"Disponível"} />
      ) : (
        <BadgeRed text="Indisponível" />
      ),
      actions: (
        <div className={`flex flex-wrap`}>
          <div>
            <TableButtonSolid
              id={table.id}
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
                    <FormTables
                      id={table.id}
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
              id={table.id}
              tooltip={`Excluir`}
              icon={
                <BiTrash size={18} className={`filter hover:drop-shadow m-1`} />
              }
              color={"danger"}
              onClick={() => {
                InfoAlert(
                  <YesNoTemplate onClickYes={() => handleModalYes(table.id)} />
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
        id={"new"}
        label={"Cadastrar"}
        color={"primary"}
        onClick={async () => {
          await Promise.resolve(
            setModalTemplate(
              <FormTables handleClear={handleClear} setModal={setModal} />
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
      .delete(`tables/${id}`)
      .then(async () => {
        SuccessAlert("Registro excluído com sucesso");
        await getTables();
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

    api.post("tables/filters", data).then(({ data }) => {
      setTables(data);
      setPending(false);
    });
  };

  const handleClear = () => {
    setValue("number", "");
    setValue("isAvailable", "");

    (document.getElementById("search") as any).click();

    return;
  };

  const options: SelectType[] = [
    {
      value: "true",
      label: "Disponível",
    },
    {
      value: "false",
      label: "Indisponível",
    },
  ];

  return (
    <>
      {modal && modalTemplate}
      {isLoading && <Loader />}
      <Navigation>
        <div className={`px-3 w-full min-h-screen`}>
          <BodyCard title={`Mesas`} newButton={newButton}>
            <div className="px-2 pt-2 pb-6">
              <div className={`py-4`}>
                {/* --------------FILTERS ------------------------------ */}
                <form onSubmit={handleSubmit(handleSearch)}>
                  <div className={`grid grid-cols-12 py-4`}>
                    <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputText
                        register={register("number")}
                        id={`number`}
                        name={"number"}
                        placeholder={"Pesquise pelo número..."}
                        label={"Número"}
                      />
                    </div>
                    <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputSelect
                        register={register("isAvailable")}
                        id={`isAvailable`}
                        name={"isAvailable"}
                        placeholder={"Selecione a situação..."}
                        label={"Situação"}
                        options={options}
                        setValue={setValue}
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

  const loadedTables: TableType[] = await apiClient
    .get("tables")
    .then(({ data }: any) => data);

  return {
    props: {
      loadedTables: loadedTables,
    },
  };
};
