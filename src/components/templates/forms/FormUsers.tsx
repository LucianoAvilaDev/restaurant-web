import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UsersSchema } from "../../../schemas/UsersSchema";
import { api } from "../../../services/api";
import { SelectType } from "../../../types/SelectType";
import { ErrorAlert } from "../../alerts/ErrorAlert";
import { SuccessAlert } from "../../alerts/SuccessAlert";
import { ButtonSolid } from "../../buttons/ButtonSolid";
import { BodyCard } from "../../cards/BodyCard";
import InputEmail from "../../input/InputEmail";
import InputPassword from "../../input/InputPassword";
import InputSelect from "../../input/InputSelect";
import InputText from "../../input/InputText";
import Loader from "../../loader/Loader";

type Props = {
  id?: string;
  setModal: Function;
  handleClear: Function;
  roles: SelectType[];
};

export const FormUsers = ({ id, setModal, handleClear, roles }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>();
  const [enablePassword, setEnablePassword] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>([]);
  const [animation, setAnimation] = useState<string>("animate-showIn");

  const defaultPassword: string = "******";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UsersSchema()),
  });

  const handleSave = (data: any) => {
    setIsLoading(true);

    if (id) {
      api
        .put(`users/${id}`, data)
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
        .post(`users`, data)
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

  const getUser = async (id: string) => {
    await api
      .get(`users/${id}`)
      .then(({ data }: any) => {
        if (data) {
          setUser(data);

          setSelected({ value: data.role.id, label: data.role.name });

          setValue("name", data.name ?? "");
          setValue("email", data.email ?? "");
          setValue("password", data.password ? defaultPassword : "");
          setValue("passwordConfirm", data.password ? defaultPassword : "");
          setValue("roleId", data.role.id ?? []);
        }
      })
      .catch((e: any) => {
        ErrorAlert(e.message);
      });
  };

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      <div
        className={`fixed z-40 bg-black/50 scrollbar w-full min-h-full flex space-x-2 justify-center align-center items-center`}
      >
        <div className={`${animation} max-h-screen w-[100vw] md:w-[80vw]`}>
          <BodyCard title={`${id ? "Editar" : "Cadastrar"} Usuário`}>
            <div className="p-2">
              <div className={`py-2`}>
                <form onSubmit={handleSubmit(handleSave)}>
                  <div className={`grid grid-cols-12 pt-2 pb-8`}>
                    <div className="p-2 sm:col-span-6 col-span-12">
                      <InputText
                        register={register("name")}
                        id={`name`}
                        name={"name"}
                        placeholder={"Digite o nome..."}
                        label={"Nome"}
                        errorMessage={errors?.name?.message}
                      />
                    </div>
                    <div className="p-2 sm:col-span-6 col-span-12">
                      <InputEmail
                        register={register("email")}
                        id={`email`}
                        placeholder={"Digite o e-mail..."}
                        label={"E-mail"}
                        errorMessage={errors?.email?.message}
                      />
                    </div>
                    <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputPassword
                        register={register("password")}
                        id={`password`}
                        name={`password`}
                        placeholder={"Digite a senha..."}
                        label={"Senha"}
                        errorMessage={errors?.password?.message}
                      />
                    </div>
                    <div className="p-2 md:col-span-4 sm:col-span-6 col-span-12">
                      <InputPassword
                        register={register("passwordConfirm")}
                        id={`passwordConfirm`}
                        name={`passwordConfirm`}
                        placeholder={"Repita a senha..."}
                        label={"Confirmar Senha"}
                        errorMessage={errors?.passwordConfirm?.message}
                      />
                    </div>

                    <div className="p-2 md:col-span-4 col-span-12 max-w-lg">
                      <InputSelect
                        register={register("roleId")}
                        id={`roleId`}
                        name={"roleId"}
                        placeholder={"Selecione o perfil..."}
                        label={"Perfil"}
                        options={roles}
                        setValue={setValue}
                        value={selected}
                        onChange={(e: any) => setSelected(e)}
                        errorMessage={errors?.roleId?.message}
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

export default FormUsers;
