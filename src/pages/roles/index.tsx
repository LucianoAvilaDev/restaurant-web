import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { v4 } from "uuid";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { InfoAlert } from "../../components/alerts/InfoAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { TableButtonSolid } from "../../components/buttons/TableButtonSolid";
import { BodyCard } from "../../components/cards/BodyCard";
import InputText from "../../components/input/InputText";
import Loader from "../../components/loader/Loader";
import Navigation from "../../components/navigation/Navigation";
import SimpleTable from "../../components/tables/SimpleTable";
import FormRoles from "../../components/templates/forms/FormRoles";
import YesNoTemplate from "../../components/templates/YesNoTemplate";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";
import { RoleType } from "../../types/RoleType";
import { SelectType } from "../../types/SelectType";

const Index = ({ loadedRoles, loadedPermissions }: any) => {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user?.permissions.includes("manage_roles"))
      router.push("../dashboard");
  }, []);

  const [roles, setRoles] = useState<RoleType[]>(loadedRoles);
  const [pending, setPending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [modalTemplate, setModalTemplate] = useState<JSX.Element>(<></>);

  const permissions = loadedPermissions;

  const { register, handleSubmit, setValue } = useForm();

  const getRoles = async () => {
    setPending(true);
    await api.get("roles").then(({ data }: any) => {
      setRoles(data);
      setPending(false);
    });
  };

  const columns: any = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
      sortable: true,
      center: true,

      allowOverflow: true,
    },
    {
      name: "Permissões",
      selector: (row: any) => row.permissions,
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

  const data: any[] = roles.map((role: RoleType) => {
    return {
      name: role.name,
      permissions: (
        <div className={`flex flex-wrap p-1`}>
          <div>
            {role.permissions.map((permission: any, index: number) => (
              <li key={v4()} className="p-1">{`${permission.description}`}</li>
            ))}
          </div>
        </div>
      ),
      actions: (
        <div className={`flex flex-wrap`}>
          <div>
            <TableButtonSolid
              id={role.id}
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
                    <FormRoles
                      id={role.id}
                      handleClear={handleClear}
                      setModal={setModal}
                      permissions={permissions}
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
              id={role.id}
              tooltip={`Excluir`}
              icon={
                <BiTrash size={18} className={`filter hover:drop-shadow m-1`} />
              }
              color={"danger"}
              onClick={() => {
                InfoAlert(
                  <YesNoTemplate onClickYes={() => handleYes(role.id)} />
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
        id={"newrole"}
        label={"Cadastrar"}
        color={"primary"}
        onClick={async () => {
          await Promise.resolve(
            setModalTemplate(
              <FormRoles
                handleClear={handleClear}
                permissions={permissions}
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

  const handleYes = async (id: string) => {
    setIsLoading(true);
    await api
      .delete(`roles/${id}`)
      .then(async () => {
        SuccessAlert("Registro excluído com sucesso");
        await getRoles();
        setIsLoading(false);
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
        setIsLoading(false);
      });
  };
  const handleSearch = (data: any) => {
    setPending(true);

    api.post("roles/filters", data).then(({ data }) => {
      setRoles(data);
      setPending(false);
    });
  };

  const handleClear = () => {
    setValue("name", "");
    setValue("type", "");
    (document.getElementById("search") as any).click();

    return;
  };

  return (
    <>
      {modal && modalTemplate}
      {isLoading && <Loader />}
      <Navigation>
        <div className={`px-3 w-full min-h-screen`}>
          <BodyCard title={`Perfis`} newButton={newButton}>
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

  const permissions: SelectType[] = await apiClient
    .get("permissions")
    .then(({ data }: any) => {
      return data.map((permission: any) => {
        return {
          value: permission.id,
          label: permission.description,
        };
      });
    });

  const roles: RoleType[] = await apiClient
    .get("roles")
    .then(({ data }: any) => data);

  return {
    props: {
      loadedRoles: roles,
      loadedPermissions: permissions,
    },
  };
};
