import { yupResolver } from "@hookform/resolvers/yup";
import { NextRouter, useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ButtonSolid } from "../../components/buttons/ButtonSolid";
import { SimpleCard } from "../../components/cards/SimpleCard";
import InputEmail from "../../components/input/InputEmail";

import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { ErrorAlert } from "../../components/alerts/ErrorAlert";
import { SuccessAlert } from "../../components/alerts/SuccessAlert";
import InputPassword from "../../components/input/InputPassword";
import Loader from "../../components/loader/Loader";
import { UsersSchema } from "../../schemas/UsersSchema";
import { api } from "../../services/api";

type Props = {
  recoveryToken: string;
};

export default function index({ recoveryToken }: Props) {
  const router: NextRouter = useRouter();

  const getUser = async () => {
    api
      .post("reset", { token: recoveryToken })
      .then(({ data }: any) => {
        setValue("id", data.id);
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("password", "");
        setValue("passwordConfirm", "");
        setValue("roleId", data.role.id ?? []);
      })
      .catch(({ response }: AxiosError) => {
        ErrorAlert(
          (response?.data as string) ??
            "Houve um erro! Tente novamente mais tarde."
        );
        router.push("login");
      });
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UsersSchema()),
  });

  const handleSave = (data: any) => {
    setIsLoading(true);
    const apiWithToken = api;
    apiWithToken.defaults.headers["token"] =
      process.env.NEXT_PUBLIC_API_TOKEN ?? "";

    apiWithToken
      .put(`saveUser/${getValues().id}`, data)
      .then(async () => {
        SuccessAlert("Registro salvo com sucesso!");
        setIsLoading(false);
        router.push("../login");
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
  };

  const handleCancel = () => {
    router.push("login");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className="bg-cover min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_WEB_URL}/foto3.png)`,
        }}
      >
        <div className="flex justify-center transition-all w-full animate-fade">
          <SimpleCard title="Recuperar senha">
            <form
              className="py-4 space-y-4"
              onSubmit={handleSubmit(handleSave)}
            >
              <div>
                <InputEmail
                  id={"email"}
                  register={register("email")}
                  label={"E-mail"}
                  placeholder={"Digite seu e-mail"}
                  readOnly
                />
              </div>
              <div>
                <InputPassword
                  id={"password"}
                  register={register("password")}
                  name={"password"}
                  placeholder={"Digite a senha"}
                  label={"Nova Senha:"}
                  errorMessage={errors?.password?.message}
                />
              </div>
              <div>
                <InputPassword
                  register={register("passwordConfirm")}
                  id={`passwordConfirm`}
                  name={`passwordConfirm`}
                  placeholder={"Repita a senha..."}
                  label={"Confirmar Senha"}
                  errorMessage={errors?.passwordConfirm?.message}
                />
              </div>

              <div className="flex space-x-3 py-2 items-center justify-center">
                <ButtonSolid
                  id={"save"}
                  label={"Enviar"}
                  color={"success"}
                  type={"submit"}
                />
                <ButtonSolid
                  id={"cancel"}
                  label={"Cancelar"}
                  color={"default"}
                  onClick={() => {
                    handleCancel();
                  }}
                />
              </div>
            </form>
          </SimpleCard>
        </div>
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const recoveryToken: string = ctx.params.token;

  return {
    props: {
      recoveryToken: recoveryToken,
    },
  };
};
