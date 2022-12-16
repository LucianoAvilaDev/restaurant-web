import { GetServerSideProps } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { RoleType } from "../../../types/RoleType";
import { SelectType } from "../../../types/SelectType";
import { UserType } from "../../../types/UserType";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { TableButtonSolid } from "../../components/buttons/TableButtonSolid";
import { BodyCard } from "../../components/cards/BodyCard";
import InputText from "../../components/input/InputText";
import Loader from "../../components/loader/Loader";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";
import FormUsers from "../../components/templates/forms/FormUsers";
import YesNoTemplate from "../../components/templates/YesNoTemplate";
import { api } from "../../services/api";
import validateAuth from "../../services/validateAuth";

const index = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [roles, setRoles] = useState<SelectType[]>([]);
  const [pending, setPending] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);

  const { register, handleSubmit, setValue } = useForm();

  const getUsers = async () => {
    setPending(true);
    await api.get("users").then(({ data }: any) => {
      setUsers(data);
      setPending(false);
    });
  };

  const getRolesForSelect = async () => {
    setPending(true);
    await api.get("roles").then(({ data }: any) => {
      setRoles(
        data.map((role: RoleType) => {
          return { value: role.id, label: role.name };
        })
      );
      setPending(false);
    });
  };

  const columns: any = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
      soruser: true,
      center: true,
      width: "30%",
    },
    {
      name: "E-mail",
      selector: (row: any) => row.email,
      soruser: true,
      center: true,
      width: "30%",
    },
    {
      name: "Perfil",
      selector: (row: any) => row.role,
      soruser: true,
      center: true,
      width: "20%",
    },

    {
      name: "Ações",
      selector: (row: any) => row.actions,
      center: true,
      width: "20%",
    },
  ];

  const data: any[] = users.map((user: UserType) => {
    return {
      name: user.name,
      email: user.email,
      role: user.role.name,
      actions: (
        <div className={`flex flex-wrap`}>
          <div>
            <TableButtonSolid
              id={user.id}
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
                    <FormUsers
                      id={user.id}
                      handleClear={handleClear}
                      setModal={setModal}
                      roles={roles}
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
              id={user.id}
              tooltip={`Excluir`}
              icon={
                <BiTrash size={18} className={`filter hover:drop-shadow m-1`} />
              }
              color={"danger"}
              onClick={() => {
                toast.info(
                  <YesNoTemplate onClickYes={() => handleModalYes(user.id)} />,
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
        id={"new"}
        label={"Cadastrar"}
        color={"primary"}
        onClick={async () => {
          await Promise.resolve(
            setModalTemplate(
              <FormUsers
                handleClear={handleClear}
                roles={roles}
                setModal={setModal}
              />
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
      .delete(`users/${id}`)
      .then(async () => {
        SuccessAlert("Registro excluído com sucesso");
        await getUsers();
        setIsLoading(false);
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
        setIsLoading(false);
      });
  };

  const handleSearch = (data: any) => {
    setPending(true);

    api.post("users/filters", data).then(({ data }) => {
      setUsers(data);
      setPending(false);
    });
  };

  const handleClear = () => {
    setValue("name", "");
    setValue("email", "");

    (document.getElementById("search") as any).click();

    return;
  };

  const getInitialData = () => {
    getRolesForSelect();
    getUsers();
  };

  useQuery("clients", getInitialData);

  return (
    <>
      {modal && modalTemplate}
      {isLoading && <Loader />}
      <Navigation>
        <div className={`px-3 w-full`}>
          <BodyCard title={`Usuários`} newButton={newButton}>
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
                      <InputText
                        register={register("email")}
                        id={`email`}
                        name={"email"}
                        placeholder={"Pesquise pelo e-mail..."}
                        label={"E-mail"}
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
