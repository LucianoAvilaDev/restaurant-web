import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RolesSchema } from "../../../schemas/RolesSchema";
import { api } from "../../../services/api";
import { SelectType } from "../../../types/SelectType";
import { ErrorAlert } from "../../alerts/ErrorAlert";
import { SuccessAlert } from "../../alerts/SuccessAlert";
import { ButtonSolid } from "../../buttons/ButtonSolid";
import { BodyCard } from "../../cards/BodyCard";
import InputSelectMultiple from "../../input/InputSelectMultiple";
import InputText from "../../input/InputText";
import Loader from "../../loader/Loader";

type Props = {
  id?: string;
  setModal: Function;
  handleClear: Function;
  permissions: SelectType[];
};

export const FormRoles = ({
  id,
  setModal,
  permissions,
  handleClear,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<any>();
  const [selected, setSelected] = useState<any>([]);
  const [animation, setAnimation] = useState<string>("animate-showIn");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RolesSchema()),
  });

  const handleSave = (data: any) => {
    setIsLoading(true);
    if (id) {
      api
        .put(`roles/${id}`, data)
        .then(async () => {
          SuccessAlert("Registro salvo com sucesso!");
          setIsLoading(false);
          setModal(false);
          await handleClear();
          return;
        })
        .catch(({ response }: AxiosError) => {
          ErrorAlert(
            (response?.data as string) ??
              "Houve um erro! Tente novamente mais tarde."
          );
          setIsLoading(false);
          return;
        });
    } else {
      api
        .post(`roles`, data)
        .then(async () => {
          SuccessAlert("Registro salvo com sucesso!");
          setIsLoading(false);
          setModal(false);
          await handleClear();
          return;
        })
        .catch(({ response }: AxiosError) => {
          ErrorAlert(
            (response?.data as string) ??
              "Houve um erro! Tente novamente mais tarde."
          );
          setIsLoading(false);
          return;
        });
    }
  };

  const handleCancel = () => {
    setAnimation("animate-showOut");
    setTimeout(() => setModal(false), 150);
  };

  const getRole = async (id: string) => {
    await api
      .get(`roles/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setRole(data);

          setSelected(
            data.permissions.map((permission: any) => {
              return { value: permission.id, label: permission.description };
            })
          );

          setValue("name", data.name ?? "");
          setValue("permissions", data.permissions ?? []);
        }
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
      });
  };

  useEffect(() => {
    if (id) {
      getRole(id);
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-full flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`${animation} max-h-screen w-[100vw] md:w-[80vw]`}>
          <BodyCard title={`${id ? "Editar" : "Cadastrar"} Perfil`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <div className="p-2 col-span-12">
                      <InputText
                        register={register("name")}
                        id={`name`}
                        name={"name"}
                        placeholder={"Digite o nome..."}
                        label={"Nome"}
                        errorMessage={errors?.name?.message}
                      />
                    </div>

                    <div className="p-2 col-span-12 max-w-lg">
                      <InputSelectMultiple
                        register={register("permissions")}
                        id={`permissions`}
                        name={"permissions"}
                        placeholder={"Selecione as permissões..."}
                        label={"Permissões"}
                        options={permissions}
                        setValue={setValue}
                        value={selected}
                        onChange={(e: any) => setSelected(e)}
                        errorMessage={errors?.permissions?.message}
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

export default FormRoles;
